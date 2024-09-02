import React, { createContext, useState, useContext, ReactNode } from 'react';

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
