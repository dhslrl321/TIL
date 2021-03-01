import { useEffect } from "react";



// Example of use:
setCookie('user', 'John', { secure: true, 'max-age': 3600 });

function App() {
  useEffect(() => {
    setCookie('JSESSIONID_DORMWEB', "hello.WAS3_servlet_engine6", {});
    setCookie('WMONID', 'VE3D9hw7a4R', {});
    // window.location.href = "https://dormweb.pcu.ac.kr/common/login.do?method=login"
  }, [])
  return (
    <div>
      Learn React
    </div>
  );
}

export default App;
