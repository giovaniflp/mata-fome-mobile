import { H4, H5, H6, Text, Button, TextArea } from "tamagui";
import { Image, TouchableOpacity, ScrollView,View } from "react-native";
import StarRating from 'react-native-star-rating-widget';
import { useEffect, useState } from "react";
import { AvaliationToast } from "app/components/AvaliationToast";
import { useRoute } from "@react-navigation/native";
import BottomBar from "app/components/BottomBar";
import {showLocation} from 'react-native-map-link';
import { router } from "expo-router";

export default function OrderDescription(){
    const { params } = useRoute<any>()
    const {
        id,
        cliente,
        dataHoraPedido,
        empresa,
        enderecoEntrega,
        formaPagamento,
        status,
        statusPagamento,
        taxaEntrega,
        valorTotal,
        itensPedido, // Itens do pedido estão disponíveis aqui
      } = params;
    
    const [rating, setRating] = useState(0);
    const itensPedidoJsonArray = JSON.parse(itensPedido);
    const enderecoJson = JSON.parse(enderecoEntrega);
    const formaPagamentoJson = JSON.parse(formaPagamento);

    return(
        <View className="flex-1">
            {
                status === 'ENTREGUE' &&
                <View className='bg-white flex-1'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <View>
                            <H4 className="text-black">Pedido - 27/07/2024 às 02:42</H4>
                            <H6 className="text-black">Status do Pedido: <Text className="text-green-500">{status}</Text></H6>
                        </View>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoLike_Money.png")}></Image>
                    </View>
                    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                    <View>
      {itensPedidoJsonArray.map((item) => (
        <View key={item.id} className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5">
          <View className="flex justify-center flex-row">
            <View>
              <Image
                className="w-32 h-32 rounded-3xl"
                source={{ uri: item.produto.urlImagem }}
              />
            </View>
            <View className="w-56 flex justify-center ml-2">
              <H5 className="text-black">{item.produto.nome}</H5>
              <H6 className="text-xs mt-2 text-black">{item.produto.descricao}</H6>
            </View>
          </View>
          <View className="flex items-center mt-2">
            <H4 className="text-black">{item.quantidade} Unidades</H4>
          </View>
        </View>
      ))}
    </View>
                        <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View>
                        <View className="flex flex-row justify-center items-center">
                            <H5 className="text-orange-500 text-center text-xs w-64">Por favor, avalie o pedido e deixe seu comentário!</H5>
                            <Image className="w-12 h-12" source={require("../public/icons/tomato/TomatoStars.png")}></Image>
                        </View>
                                
                                <View className="flex items-center">
                                    <TextArea className="w-80 my-2 bg-white text-black" verticalAlign="top"></TextArea>
                                    <View className="flex flex-row items-center">
                                        <StarRating
                                        rating={rating}
                                        onChange={setRating}
                                        />
                                        <AvaliationToast></AvaliationToast>
                                    </View>
                                </View>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Endereço de entrega</H5>
                                <H6 className="text-black">{enderecoJson.logradouro}, {enderecoJson.numero}, <Text className="text-orange-500">Complemento: {enderecoJson.complemento}</Text> - {enderecoJson.bairro}, {enderecoJson.cidade} - {enderecoJson.estado}, {enderecoJson.cep}</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center my-5">
                    <H4 className="text-black">Forma de pagamento</H4>
                    <View className="flex flex-row items-center mt-2">
                        <Image className="w-10 h-10" source={require("../public/icons/ui/creditCard.png")}></Image>
                        <View className="w-80 ml-2">
                            <H6 className="text-black">Cartão de {formaPagamentoJson.tipo} terminado em <H6 className="text-orange-500">{formaPagamentoJson.numeroCartao.slice(-4)}</H6></H6>
                        </View>
                    </View>
                    <View>
      <H5 className="mb-2 mt-5 text-red-500">Subtotal</H5>
      {itensPedidoJsonArray.map((item) => (
        <H6 key={item.id} className="text-black mb-1">
          {item.quantidade} x {item.produto.nome} - <H6 className="text-orange-500">R$ {item.produto.preco.toFixed(2).replace('.', ',')}</H6>
        </H6>
      ))}
      <H6 className="text-black">Frete - <H6 className="text-orange-500">R$ {taxaEntrega}</H6></H6>

      <View className="mt-5">
        <H4 className="text-black">Valor total</H4>
        <H5 className="text-orange-500">R$ {Number(valorTotal)+Number(taxaEntrega)}</H5>
      </View>
    </View>
                </View>
                    </ScrollView>
                    <BottomBar screen="OrderDescription"></BottomBar>
                </View>
            }
            {
                status === 'PENDENTE' &&
                <View className='bg-white flex-1'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <View>
                            <H4 className="text-black">Pedido - 27/07/2024 às 02:42</H4>
                            <H6 className="text-black">Status do Pedido: <Text className="text-yellow-500">{status}</Text></H6>
                        </View>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoLike_Money.png")}></Image>
                    </View>
                    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                    <View>
      {itensPedidoJsonArray.map((item) => (
        <View key={item.id} className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5">
          <View className="flex justify-center flex-row">
            <View>
              <Image
                className="w-32 h-32 rounded-3xl"
                source={{ uri: item.produto.urlImagem }}
              />
            </View>
            <View className="w-56 flex justify-center ml-2">
              <H5 className="text-black">{item.produto.nome}</H5>
              <H6 className="text-xs mt-2 text-black">{item.produto.descricao}</H6>
            </View>
          </View>
          <View className="flex items-center mt-2">
            <H4 className="text-black">{item.quantidade} Unidades</H4>
          </View>
        </View>
      ))}
    </View>

                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Endereço de entrega</H5>
                                <H6 className="text-black">{enderecoJson.logradouro}, {enderecoJson.numero}, <Text className="text-orange-500">Complemento: {enderecoJson.complemento}</Text> - {enderecoJson.bairro}, {enderecoJson.cidade} - {enderecoJson.estado}, {enderecoJson.cep}</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center my-5">
                    <H4 className="text-black">Forma de pagamento</H4>
                    <View className="flex flex-row items-center mt-2">
                        <Image className="w-10 h-10" source={require("../public/icons/ui/creditCard.png")}></Image>
                        <View className="w-80 ml-2">
                            <H6 className="text-black">Cartão de {formaPagamentoJson.tipo} terminado em <H6 className="text-orange-500">{formaPagamentoJson.numeroCartao.slice(-4)}</H6></H6>
                        </View>
                    </View>
                    <View>
      <H5 className="mb-2 mt-5 text-red-500">Subtotal</H5>
      {itensPedidoJsonArray.map((item) => (
        <H6 key={item.id} className="text-black mb-1">
          {item.quantidade} x {item.produto.nome} - <H6 className="text-orange-500">R$ {item.produto.preco.toFixed(2).replace('.', ',')}</H6>
        </H6>
      ))}
      <H6 className="text-black">Frete - <H6 className="text-orange-500">R$ {taxaEntrega}</H6></H6>

      <View className="mt-5">
        <H4 className="text-black">Valor total</H4>
        <H5 className="text-orange-500">R$ {Number(valorTotal)+Number(taxaEntrega)}</H5>
      </View>
    </View>
                </View>
                    </ScrollView>
                    <BottomBar screen="OrderDescription"></BottomBar>
                </View>
            }
            {
                status === 'CANCELADO' &&
                <View className='bg-white flex-1'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <View>
                            <H4 className="text-black">Pedido - 27/07/2024 às 02:42</H4>
                            <H6 className="text-black">Status do Pedido: <Text className="text-red-500">{status}</Text></H6>
                        </View>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoLike_Money.png")}></Image>
                    </View>
                    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                    <View>
      {itensPedidoJsonArray.map((item) => (
        <View key={item.id} className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5">
          <View className="flex justify-center flex-row">
            <View>
              <Image
                className="w-32 h-32 rounded-3xl"
                source={{ uri: item.produto.urlImagem }}
              />
            </View>
            <View className="w-56 flex justify-center ml-2">
              <H5 className="text-black">{item.produto.nome}</H5>
              <H6 className="text-xs mt-2 text-black">{item.produto.descricao}</H6>
            </View>
          </View>
          <View className="flex items-center mt-2">
            <H4 className="text-black">{item.quantidade} Unidades</H4>
          </View>
        </View>
      ))}
    </View>

                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Endereço de entrega</H5>
                                <H6 className="text-black">{enderecoJson.logradouro}, {enderecoJson.numero}, <Text className="text-orange-500">Complemento: {enderecoJson.complemento}</Text> - {enderecoJson.bairro}, {enderecoJson.cidade} - {enderecoJson.estado}, {enderecoJson.cep}</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center my-5">
                    <H4 className="text-black">Forma de pagamento</H4>
                    <View className="flex flex-row items-center mt-2">
                        <Image className="w-10 h-10" source={require("../public/icons/ui/creditCard.png")}></Image>
                        <View className="w-80 ml-2">
                            <H6 className="text-black">Cartão de {formaPagamentoJson.tipo} terminado em <H6 className="text-orange-500">{formaPagamentoJson.numeroCartao.slice(-4)}</H6></H6>
                        </View>
                    </View>
                    <View>
      <H5 className="mb-2 mt-5 text-red-500">Subtotal</H5>
      {itensPedidoJsonArray.map((item) => (
        <H6 key={item.id} className="text-black mb-1">
          {item.quantidade} x {item.produto.nome} - <H6 className="text-orange-500">R$ {item.produto.preco.toFixed(2).replace('.', ',')}</H6>
        </H6>
      ))}
      <H6 className="text-black">Frete - <H6 className="text-orange-500">R$ {taxaEntrega}</H6></H6>

      <View className="mt-5">
        <H4 className="text-black">Valor total</H4>
        <H5 className="text-orange-500">R$ {Number(valorTotal)+Number(taxaEntrega)}</H5>
      </View>
    </View>
                </View>
                    </ScrollView>
                    <BottomBar screen="OrderDescription"></BottomBar>
                </View>
            }
            {
                status === 'PROCESSANDO' &&
                <View className='bg-white flex-1'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <View>
                            <H4 className="text-black">Pedido - 27/07/2024 às 02:42</H4>
                            <H6 className="text-black">Status do Pedido: <Text className="text-orange-500">{status}</Text></H6>
                        </View>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoLike_Money.png")}></Image>
                    </View>
                    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                    <View>
      {itensPedidoJsonArray.map((item) => (
        <View key={item.id} className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5">
          <View className="flex justify-center flex-row">
            <View>
              <Image
                className="w-32 h-32 rounded-3xl"
                source={{ uri: item.produto.urlImagem }}
              />
            </View>
            <View className="w-56 flex justify-center ml-2">
              <H5 className="text-black">{item.produto.nome}</H5>
              <H6 className="text-xs mt-2 text-black">{item.produto.descricao}</H6>
            </View>
          </View>
          <View className="flex items-center mt-2">
            <H4 className="text-black">{item.quantidade} Unidades</H4>
          </View>
        </View>
      ))}
    </View>

                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Endereço de entrega</H5>
                                <H6 className="text-black">{enderecoJson.logradouro}, {enderecoJson.numero}, <Text className="text-orange-500">Complemento: {enderecoJson.complemento}</Text> - {enderecoJson.bairro}, {enderecoJson.cidade} - {enderecoJson.estado}, {enderecoJson.cep}</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center my-5">
                    <H4 className="text-black">Forma de pagamento</H4>
                    <View className="flex flex-row items-center mt-2">
                        <Image className="w-10 h-10" source={require("../public/icons/ui/creditCard.png")}></Image>
                        <View className="w-80 ml-2">
                            <H6 className="text-black">Cartão de {formaPagamentoJson.tipo} terminado em <H6 className="text-orange-500">{formaPagamentoJson.numeroCartao.slice(-4)}</H6></H6>
                        </View>
                    </View>
                    <View>
      <H5 className="mb-2 mt-5 text-red-500">Subtotal</H5>
      {itensPedidoJsonArray.map((item) => (
        <H6 key={item.id} className="text-black mb-1">
          {item.quantidade} x {item.produto.nome} - <H6 className="text-orange-500">R$ {item.produto.preco.toFixed(2).replace('.', ',')}</H6>
        </H6>
      ))}
      <H6 className="text-black">Frete - <H6 className="text-orange-500">R$ {taxaEntrega}</H6></H6>

      <View className="mt-5">
        <H4 className="text-black">Valor total</H4>
        <H5 className="text-orange-500">R$ {Number(valorTotal)+Number(taxaEntrega)}</H5>
      </View>
    </View>
                </View>
                    </ScrollView>
                    <BottomBar screen="OrderDescription"></BottomBar>
                </View>
            }
            {
                status === 'EM TRÂNSITO' &&
                <View className='bg-white flex-1'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <View>
                            <H4 className="text-black">Pedido - 27/07/2024 às 02:42</H4>
                            <H6 className="text-black">Status do Pedido: <Text className="text-blue-500">{status}</Text></H6>
                        </View>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoLike_Money.png")}></Image>
                    </View>
                    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                    <View>
      {itensPedidoJsonArray.map((item) => (
        <View key={item.id} className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5">
          <View className="flex justify-center flex-row">
            <View>
              <Image
                className="w-32 h-32 rounded-3xl"
                source={{ uri: item.produto.urlImagem }}
              />
            </View>
            <View className="w-56 flex justify-center ml-2">
              <H5 className="text-black">{item.produto.nome}</H5>
              <H6 className="text-xs mt-2 text-black">{item.produto.descricao}</H6>
            </View>
          </View>
          <View className="flex items-center mt-2">
            <H4 className="text-black">{item.quantidade} Unidades</H4>
          </View>
        </View>
      ))}
    </View>

                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Endereço de entrega</H5>
                                <H6 className="text-black">{enderecoJson.logradouro}, {enderecoJson.numero}, <Text className="text-orange-500">Complemento: {enderecoJson.complemento}</Text> - {enderecoJson.bairro}, {enderecoJson.cidade} - {enderecoJson.estado}, {enderecoJson.cep}</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center my-5">
                    <H4 className="text-black">Forma de pagamento</H4>
                    <View className="flex flex-row items-center mt-2">
                        <Image className="w-10 h-10" source={require("../public/icons/ui/creditCard.png")}></Image>
                        <View className="w-80 ml-2">
                            <H6 className="text-black">Cartão de {formaPagamentoJson.tipo} terminado em <H6 className="text-orange-500">{formaPagamentoJson.numeroCartao.slice(-4)}</H6></H6>
                        </View>
                    </View>
                    <View>
      <H5 className="mb-2 mt-5 text-red-500">Subtotal</H5>
      {itensPedidoJsonArray.map((item) => (
        <H6 key={item.id} className="text-black mb-1">
          {item.quantidade} x {item.produto.nome} - <H6 className="text-orange-500">R$ {item.produto.preco.toFixed(2).replace('.', ',')}</H6>
        </H6>
      ))}
      <H6 className="text-black">Frete - <H6 className="text-orange-500">R$ {taxaEntrega}</H6></H6>

      <View className="mt-5">
        <H4 className="text-black">Valor total</H4>
        <H5 className="text-orange-500">R$ {Number(valorTotal)+Number(taxaEntrega)}</H5>
      </View>
    </View>
                </View>
                    </ScrollView>
                    <BottomBar screen="OrderDescription"></BottomBar>
                </View>
            }
            {
                status === 'EM_TRANSITO'  &&
                <View className='bg-white flex-1'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <View>
                            <H4 className="text-black">Pedido - 27/07/2024 às 02:42</H4>
                            <H6 className="text-black">Status do Pedido: <Text className="text-blue-500">{status}</Text></H6>
                        </View>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoLike_Money.png")}></Image>
                    </View>
                    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                    <View>
      {itensPedidoJsonArray.map((item) => (
        <View key={item.id} className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5">
          <View className="flex justify-center flex-row">
            <View>
              <Image
                className="w-32 h-32 rounded-3xl"
                source={{ uri: item.produto.urlImagem }}
              />
            </View>
            <View className="w-56 flex justify-center ml-2">
              <H5 className="text-black">{item.produto.nome}</H5>
              <H6 className="text-xs mt-2 text-black">{item.produto.descricao}</H6>
            </View>
          </View>
          <View className="flex items-center mt-2">
            <H4 className="text-black">{item.quantidade} Unidades</H4>
          </View>
        </View>
      ))}
    </View>
    <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex items-center justify-center mt-5">
                    <View className="w-80 flex items-center">
                                <H5 className="text-orange-500">Rastreamento de pedido</H5>
                                <Button className="bg-black text-white my-4 w-80" onPress={()=>{
                                    showLocation({
                                        address: 'Estr. de Bulhões - Bulhões, Jaboatão dos Guararapes - PE, 54080-000',
                                        title: 'Estr. de Bulhões - Bulhões, Jaboatão dos Guararapes - PE, 54080-000',
                                        appsWhiteList: ['google-maps', 'apple-maps'],
                                        directionsMode: 'car',
                                    });
                                }}>Mostrar localização atual</Button>
                                <H6 className="text-black">Tempo estimado - <Text className="text-red-500">32 minutos</Text></H6>
                    </View>
                </View>

                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Endereço de entrega</H5>
                                <H6 className="text-black">{enderecoJson.logradouro}, {enderecoJson.numero}, <Text className="text-orange-500">Complemento: {enderecoJson.complemento}</Text> - {enderecoJson.bairro}, {enderecoJson.cidade} - {enderecoJson.estado}, {enderecoJson.cep}</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center my-5">
                    <H4 className="text-black">Forma de pagamento</H4>
                    <View className="flex flex-row items-center mt-2">
                        <Image className="w-10 h-10" source={require("../public/icons/ui/creditCard.png")}></Image>
                        <View className="w-80 ml-2">
                            <H6 className="text-black">Cartão de {formaPagamentoJson.tipo} terminado em <H6 className="text-orange-500">{formaPagamentoJson.numeroCartao.slice(-4)}</H6></H6>
                        </View>
                    </View>
                    <View>
      <H5 className="mb-2 mt-5 text-red-500">Subtotal</H5>
      {itensPedidoJsonArray.map((item) => (
        <H6 key={item.id} className="text-black mb-1">
          {item.quantidade} x {item.produto.nome} - <H6 className="text-orange-500">R$ {item.produto.preco.toFixed(2).replace('.', ',')}</H6>
        </H6>
      ))}
      <H6 className="text-black">Frete - <H6 className="text-orange-500">R$ {taxaEntrega}</H6></H6>

      <View className="mt-5">
        <H4 className="text-black">Valor total</H4>
        <H5 className="text-orange-500">R$ {Number(valorTotal)+Number(taxaEntrega)}</H5>
      </View>
    </View>
                </View>
                    </ScrollView>
                    <BottomBar screen="OrderDescription"></BottomBar>
                </View>
            }
            {
                status === 'EM TRANSITO' &&
                <View className='bg-white flex-1'>
                    <View className="mt-10 flex flex-row justify-around items-center">
                        <View>
                            <H4 className="text-black">Pedido - 27/07/2024 às 02:42</H4>
                            <H6 className="text-black">Status do Pedido: <Text className="text-blue-500">{status}</Text></H6>
                        </View>
                        <Image className="w-20 h-20" source={require("../public/icons/tomato/TomatoLike_Money.png")}></Image>
                    </View>
                    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
                    <View>
      {itensPedidoJsonArray.map((item) => (
        <View key={item.id} className="bg-gray-200 rounded-3xl p-4 mx-2 mt-5">
          <View className="flex justify-center flex-row">
            <View>
              <Image
                className="w-32 h-32 rounded-3xl"
                source={{ uri: item.produto.urlImagem }}
              />
            </View>
            <View className="w-56 flex justify-center ml-2">
              <H5 className="text-black">{item.produto.nome}</H5>
              <H6 className="text-xs mt-2 text-black">{item.produto.descricao}</H6>
            </View>
          </View>
          <View className="flex items-center mt-2">
            <H4 className="text-black">{item.quantidade} Unidades</H4>
          </View>
        </View>
      ))}
    </View>

                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Observação*</H5>
                                <H6 className="text-black">Por favor, retirar a mostarda e quero a carne bem passada.</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center mt-5">
                    <View className="w-80">
                                <H5 className="text-orange-500">Endereço de entrega</H5>
                                <H6 className="text-black">{enderecoJson.logradouro}, {enderecoJson.numero}, <Text className="text-orange-500">Complemento: {enderecoJson.complemento}</Text> - {enderecoJson.bairro}, {enderecoJson.cidade} - {enderecoJson.estado}, {enderecoJson.cep}</H6>
                    </View>
                </View>
                <View className="bg-gray-200 rounded-3xl p-4 mx-2 flex justify-center my-5">
                    <H4 className="text-black">Forma de pagamento</H4>
                    <View className="flex flex-row items-center mt-2">
                        <Image className="w-10 h-10" source={require("../public/icons/ui/creditCard.png")}></Image>
                        <View className="w-80 ml-2">
                            <H6 className="text-black">Cartão de {formaPagamentoJson.tipo} terminado em <H6 className="text-orange-500">{formaPagamentoJson.numeroCartao.slice(-4)}</H6></H6>
                        </View>
                    </View>
                    <View>
      <H5 className="mb-2 mt-5 text-red-500">Subtotal</H5>
      {itensPedidoJsonArray.map((item) => (
        <H6 key={item.id} className="text-black mb-1">
          {item.quantidade} x {item.produto.nome} - <H6 className="text-orange-500">R$ {item.produto.preco.toFixed(2).replace('.', ',')}</H6>
        </H6>
      ))}
      <H6 className="text-black">Frete - <H6 className="text-orange-500">R$ {taxaEntrega}</H6></H6>

      <View className="mt-5">
        <H4 className="text-black">Valor total</H4>
        <H5 className="text-orange-500">R$ {Number(valorTotal)+Number(taxaEntrega)}</H5>
      </View>
    </View>
                </View>
                    </ScrollView>
                    <BottomBar screen="OrderDescription"></BottomBar>
                </View>
            }
        </View>
    )
}