import { Text, View } from "react-native";
import BisonLogo from "../../assets/images/BisonLogo";
import styles from "./styles";

interface AppHeaderProps {
  balance: string;
  balanceInFiat: string;
}

const AppHeader = ({ balance, balanceInFiat }: AppHeaderProps) => (
  <View style={styles.container}>
    <BisonLogo />
    <View style={styles.balanceContainer}>
      <Text>Available</Text>
      <Text style={styles.balance}>
        {balance} <Text style={styles.currency}>BTC</Text>
      </Text>
      <Text style={styles.balance}>
        {balanceInFiat} <Text style={styles.currency}>€</Text>
      </Text>
    </View>
  </View>
);

export default AppHeader;