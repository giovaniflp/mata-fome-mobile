import { Client } from '@stomp/stompjs';
import SockJS from "sockjs-client";
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as Notifications from 'expo-notifications';


// Define a interface para um produto
interface Produto {
    id: number;
    idEmpresa: number;
    nome: string;
    preco: number;
    descricao?: string;
    urlImagem?: string;
    quantidade: number;
}

// Define a interface para o contexto do carrinho
interface CarrinhoContextData {
    carrinho: Produto[];
    adicionarAoCarrinho: (produto: Produto) => void;
    removerDoCarrinho: (produtoId: number) => void;
    limparCarrinho: () => void;
}

// Cria o contexto com um valor inicial indefinido
const CarrinhoContext = createContext<CarrinhoContextData | undefined>(undefined);

// Define a interface para o provider
interface CarrinhoProviderProps {
    children: ReactNode;
}

// Cria o provider
export const CarrinhoProvider: React.FC<CarrinhoProviderProps> = ({ children }) => {
    const [carrinho, setCarrinho] = useState<Produto[]>([]);

    const adicionarAoCarrinho = (produto: Produto) => {
        setCarrinho((prevCarrinho) => {
            // Verifica se existe um produto no carrinho com um idEmpresa diferente
            const produtoExistente = prevCarrinho.find((item) => item.idEmpresa !== produto.idEmpresa);
            
            if (produtoExistente) {
                // Se encontrar, limpa o carrinho e adiciona o novo produto
                return [{ ...produto, quantidade: produto.quantidade }];
            } else {
                // Se não encontrar, adiciona o novo produto ao carrinho
                const produtoNoCarrinho = prevCarrinho.find((item) => item.id === produto.id);
                
                if (produtoNoCarrinho) {
                    // Atualiza a quantidade do produto existente incrementando a quantidade especificada
                    return prevCarrinho.map((item) =>
                        item.id === produto.id
                            ? { ...item, quantidade: item.quantidade + 1 } // Incrementa a quantidade existente
                            : item
                    );
                } else {
                    // Adiciona o produto novo ao carrinho com a quantidade especificada
                    return [...prevCarrinho, { ...produto, quantidade: produto.quantidade }];
                }
            }
        });
    };

    const removerDoCarrinho = (produtoId: number) => {
        setCarrinho((prevCarrinho) => {
            const produtoExistente = prevCarrinho.find((item) => item.id === produtoId);
            
            if (produtoExistente && produtoExistente.quantidade > 1) {
                // Diminui a quantidade do produto existente
                return prevCarrinho.map((item) =>
                    item.id === produtoId
                        ? { ...item, quantidade: item.quantidade - 1 } // Diminui a quantidade
                        : item
                );
            }
            
            // Remove o produto se a quantidade for 1 ou menor
            return prevCarrinho.filter((item) => item.id !== produtoId);
        });
    };

    const limparCarrinho = () => {
        setCarrinho([]);
    };

    const [idUser, setIdUser] = useState();

    const getSecureStorageData = async () => {
        const tokenStorage = await SecureStore.getItemAsync('token');
        const usernameStorage = await SecureStore.getItemAsync('username');
        const idUserStorage = await SecureStore.getItemAsync('idUser');

        const idUserParse = JSON.parse(idUserStorage);
        console.log(idUserParse);

        setIdUser(idUserParse);
    };

    useEffect(() => {
        getSecureStorageData();
    }, []);

    useEffect(() => {
        // Conectando ao WebSocket
        const socket = new SockJS('https://matafome-api.whiteglacier-7456d729.brazilsouth.azurecontainerapps.io/ws');
        const stompClient = new Client({
          webSocketFactory: () => socket,
          debug: (str) => console.log(str),
          reconnectDelay: 5000, // Tenta reconectar em caso de falha
        });
      
        stompClient.onConnect = () => {
          console.log('Conectado ao WebSocket');
            
          // Subscrevendo ao tópico para receber pedidos
          stompClient.subscribe(`/topic/pedidoCliente/${idUser}`, (message) => {
            try {
                const pedidoData = JSON.parse(message.body);

                // Ajustar o texto de status para exibição
                const statusDisplay =
                  pedidoData.status === 'EM_TRANSITO' ? 'EM TRÂNSITO' : pedidoData.status;
                
                // Enviar notificação de atualização
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: 'Atualização de Pedido',
                    body: `O status de um de seus pedidos foi atualizado para ${statusDisplay}`,
                  },
                  trigger: null,
                });
      
              // Atualize o estado com o pedido recebidoç
            } catch (error) {
              console.error('Erro ao processar mensagem WebSocket:', error);
            }
          });
          
        };
      
        stompClient.activate(); // Ativa o WebSocket
      
        // Limpa a conexão quando o componente for desmontado
        return () => {
          stompClient.deactivate();
        };
      }, [idUser != null]);

      const [socket, setSocket] = useState(null);

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
};

// Hook para usar o contexto
export const useCarrinho = (): CarrinhoContextData => {
    const context = useContext(CarrinhoContext);
    if (!context) {
        throw new Error('useCarrinho must be used within a CarrinhoProvider');
    }
    return context;
};
