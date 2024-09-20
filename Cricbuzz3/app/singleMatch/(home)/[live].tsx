import { setSharedProps } from "../../../lib/matchId";
import Commentary from "../../../components/commentary"
import { useLocalSearchParams } from "expo-router";

const live = () => {
    const prop = useLocalSearchParams();
    setSharedProps(prop.live);
    // console.log("Live is going on");
    return (
        <Commentary />
    )
}

export default live;