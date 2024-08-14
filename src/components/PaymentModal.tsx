import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  HStack,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignTitle?: string;
  onPaymentSuccess?: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, campaignTitle, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card');
  const [cardName, setCardName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');
  const [bankAccount, setBankAccount] = useState<string>('');
  const [accountType, setAccountType] = useState<string>('Savings');
  const [ifscCode, setIfscCode] = useState<string>('');
  const [swiftCode, setSwiftCode] = useState<string>('');
  const [accountHolderName, setAccountHolderName] = useState<string>('');
  const [bankName, setBankName] = useState<string>('');
  const [upiId, setUpiId] = useState<string>('');
  const [paypalEmail, setPaypalEmail] = useState<string>('');
  const [donationAmount, setDonationAmount] = useState<string>('');
  const toast = useToast();

  const handlePayment = () => {
    // Simulate payment processing with a timeout
    setTimeout(() => {
      onClose();
      toast({
        title: 'Payment Successful',
        description: `Your donation to ${campaignTitle} was successful.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    }, 2000);
  };

  // Colors that adapt to dark/light mode
  const backgroundColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const inputBackground = useColorModeValue('gray.100', 'gray.700');
  const inputBorderColor = useColorModeValue('gray.300', 'gray.600');
  const modalHeaderFooterBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg={backgroundColor} color={textColor}>
        <ModalHeader bg={modalHeaderFooterBg}>Donate to {campaignTitle || 'Campaign'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Payment Method</FormLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                bg={inputBackground}
                borderColor={inputBorderColor}
              >
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Bank Transfer</option>
                <option>UPI</option>
                <option>PayPal</option>
              </Select>
            </FormControl>

            {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
              <>
                <FormControl isRequired>
                  <FormLabel>Name on Card</FormLabel>
                  <Input
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    bg={inputBackground}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Card Number</FormLabel>
                  <Input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    bg={inputBackground}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
                <HStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Expiration Date</FormLabel>
                    <Input
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      bg={inputBackground}
                      borderColor={inputBorderColor}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>CVV</FormLabel>
                    <Input
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      bg={inputBackground}
                      borderColor={inputBorderColor}
                    />
                  </FormControl>
                </HStack>
              </>
            )}

            {paymentMethod === 'Bank Transfer' && (
              <>
                <FormControl isRequired>
                  <FormLabel>Account Holder Name</FormLabel>
                  <Input
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    placeholder="John Doe"
                    bg={inputBackground}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Bank Account Number</FormLabel>
                  <Input
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    placeholder="123456789"
                    bg={inputBackground}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Account Type</FormLabel>
                  <Select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    bg={inputBackground}
                    borderColor={inputBorderColor}
                  >
                    <option>Savings</option>
                    <option>Current</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Bank Name</FormLabel>
                  <Input
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="XYZ Bank"
                    bg={inputBackground}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>IFSC Code</FormLabel>
                  <Input
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value)}
                    placeholder="ABCD0123456"
                    bg={inputBackground}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>SWIFT Code (Optional)</FormLabel>
                  <Input
                    value={swiftCode}
                    onChange={(e) => setSwiftCode(e.target.value)}
                    placeholder="XYZ12345"
                    bg={inputBackground}
                    borderColor={inputBorderColor}
                  />
                </FormControl>
              </>
            )}

            {paymentMethod === 'UPI' && (
              <FormControl isRequired>
                <FormLabel>UPI ID</FormLabel>
                <Input
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourupi@bank"
                  bg={inputBackground}
                  borderColor={inputBorderColor}
                />
              </FormControl>
            )}

            {paymentMethod === 'PayPal' && (
              <FormControl isRequired>
                <FormLabel>PayPal Email</FormLabel>
                <Input
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  placeholder="youremail@example.com"
                  bg={inputBackground}
                  borderColor={inputBorderColor}
                />
              </FormControl>
            )}

            <FormControl isRequired>
              <FormLabel>Donation Amount</FormLabel>
              <Input
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="$50"
                bg={inputBackground}
                borderColor={inputBorderColor}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter bg={modalHeaderFooterBg}>
          <Button colorScheme="green" mr={3} onClick={handlePayment}>
            Donate Now
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
