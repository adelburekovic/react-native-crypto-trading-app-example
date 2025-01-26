import { useColorScheme, View } from "react-native";
import AppChart from "../../components/AppChart";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import AppHeader from "../../components/AppHeader";
import styles from "./styles";

const HomeScreen = (): React.JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';

    const testData: LineChartData = {
        labels: ['68700', '68800', '68900', '69000', '69100', '69200'],
        datasets: [
            {
                data: [68700, 68900, 69050, 68800, 69100, 68900],
                color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
                strokeWidth: 2
            }
        ]
    };

    return (
        <View
            style={styles.container}>
            <AppHeader
                balance="2580"
                balanceInFiat="1245561" />
            <AppChart data={testData} />
        </View>
    );
};

export default HomeScreen;