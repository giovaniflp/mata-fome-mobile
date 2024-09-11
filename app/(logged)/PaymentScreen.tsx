import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import BottomBar from 'app/components/BottomBar';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axiosInstance from 'app/config/axiosUrlConfig';

export default function PaymentScreen() {
  const [idUser, setIdUser] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState([]);

  const getIdUser = async () => {
    const idUserStorage = await SecureStore.getItemAsync('idUser');
    const idUserParse = JSON.parse(idUserStorage);
    setIdUser(idUserParse);
  };

  const savePaymentMethodIdInStorage = async (paymentMethodId) => {
    await SecureStore.setItemAsync('formaPagamentoId', JSON.stringify(paymentMethodId));
  };

  useEffect(() => {
    getIdUser();
  }, []);

  useEffect(() => {
    if (idUser) {
      apiGetPaymentMethods();
    }
  }, [idUser]);

  const apiGetPaymentMethods = async () => {
    const response = await axiosInstance.get(`/api/clientes/${idUser}/formasDePagamentos`);
    setPaymentMethods(response.data.pagtos);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Formas de pagamento</Text>
          <Image style={styles.headerImage} source={require("../public/icons/tomato/TomatoLike_Money.png")} />
        </View>

        <View style={styles.balanceSection}>
          <Text style={styles.sectionTitle}>Saldo em carteira</Text>
          <Text style={styles.balanceAmount}>R$ 25,93</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Adicionar saldo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.paymentMethodsSection}>
          <Text style={styles.sectionTitle}>Minhas formas de pagamento</Text>
          {paymentMethods.map((paymentMethod) => {
            const isSelected = paymentMethod.id === selectedPaymentMethod;

            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedPaymentMethod(paymentMethod.id);
                  savePaymentMethodIdInStorage(paymentMethod.id);
                }}
                key={paymentMethod.id}
                style={[
                  styles.paymentOption,
                  isSelected && styles.selectedPaymentOption
                ]}
              >
                <Text style={styles.paymentOptionText}>{paymentMethod.tipo}</Text>
                <Text style={styles.paymentOptionSubtitle}>Terminado em {paymentMethod.numero_cartao.slice(-4)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.paymentMethodsSection}>
          <Text style={styles.sectionTitle}>Nova forma de pagamento</Text>
          <View style={styles.paymentOptions}>
            <TouchableOpacity onPress={() => router.push('RegisterNewPaymentMethodScreen')} style={styles.paymentOption}>
              <Text style={styles.paymentOptionIcon}>💳</Text>
              <Text style={styles.paymentOptionText}>Cartão de crédito</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('RegisterNewDebitPaymentScreen')} style={styles.paymentOption}>
              <Text style={styles.paymentOptionIcon}>💳</Text>
              <Text style={styles.paymentOptionText}>Cartão de débito</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('RegisterNewVoucherScreen')} style={styles.paymentOption}>
              <Text style={styles.paymentOptionIcon}>🎫</Text>
              <Text style={styles.paymentOptionText}>Vale alimentação</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('RegisterNewVoucherScreen')} style={styles.paymentOption}>
              <Text style={styles.paymentOptionIcon}>🎫</Text>
              <Text style={styles.paymentOptionText}>Vale refeição</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('PayWithWalletScreen')} style={styles.paymentOption}>
              <Text style={styles.paymentOptionIcon}>💰</Text>
              <Text style={styles.paymentOptionText}>Pagar com a carteira</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.transactionHistorySection}>
          <Text style={styles.sectionTitle}>Histórico de Transação</Text>
          {[
            { title: "Tucano's Açaí", subtitle: 'Pix', amount: 'R$ 26,64', date: 'Pedido nº 5540 - 10/07/2024 às 15:37' },
            { title: 'Burger King - Agamenon Magalhães', subtitle: 'Crédito - CRÉDITO - MASTERCARD', amount: 'R$ 38,88', date: 'Pedido nº 9023 - 11/06/2024 às 23:20' },
            { title: 'Burquers', subtitle: '', amount: 'R$ 22,98', date: '' },
          ].map((transaction, index) => (
            <View key={index} style={styles.transactionItem}>
              <View>
                <Text style={styles.transactionTitle}>{transaction.title}</Text>
                <Text style={styles.transactionSubtitle}>{transaction.subtitle}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={styles.transactionAmount}>{transaction.amount}</Text>
            </View>
          ))}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => router.push('OrderConfirmationScreen')}
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <BottomBar screen="PaymentScreen" style={styles.bottomBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    paddingBottom: 60, // Ajuste esse valor para a altura do seu BottomBar
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerImage: {
    width: 40,
    height: 40,
  },
  balanceSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  paymentMethodsSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
  },
  paymentOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  paymentOption: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  paymentOptionIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  paymentOptionText: {
    textAlign: 'center',
    fontSize: 12,
  },
  transactionHistorySection: {
    backgroundColor: '#ffffff',
    padding: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  transactionTitle: {
    fontWeight: 'bold',
  },
  transactionSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  transactionAmount: {
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#FFA500', // cor laranja
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '80%',
  },
  continueButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});