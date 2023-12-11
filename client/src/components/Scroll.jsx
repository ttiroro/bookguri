import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Scroll = () => {
    // 스크롤 이동시 가장 상단에 위치하도록 하는 컴포넌트
    const { pathname } = useLocation();

    useEffect(()=>{
        window.scrollTo(0,0);
    }, [pathname])
  return null;
}

export default Scroll