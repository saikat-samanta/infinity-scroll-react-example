import React from "react";
import { useInfinityScroll } from "./useInfinityScroll";
import "./styles.css";
import { useEffect } from "react";

function App() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [products, setProducts] = React.useState([
    "gpjaznf",
    "hefztsugpwcdbxanvm",
    "kodhqlctubmvnigxasjwrpfzey",
    "utkigpjnlrymdqabvoexs",
    "cblkexdqy",
    "kdfzelrpnvctuyhmxb",
    "dybkzlefotpvwxmshacq",
    "dpmhcobxrqsgwfkvenlaiytjz",
    "hnerbpyxlagiocsmkqdvwf",
    "falqhvpbxykemjcsdtuzrogwni",
    "wunj",
    "sxdwmcobfr",
    "edcqmhyguwslkpnbrtvxajifoz",
    "gmkh",
    "cwxfilgjyku",
    "myjdcqziostvplfuwh",
    "cbptdeofihn",
    "hg",
    "mabxrozvlncpdjqesutfg",
    "huakjpmieo"
  ]);
  const [isLoading, setIsLoading] = React.useState(false);

  const unsubscribe = useInfinityScroll({
    ref,
    async onScrollEnd() {
      setIsLoading(true);
      await setTimeout(() => {
        setIsLoading(false);
        setProducts((prev) => [
          ...prev,
          ...[...Array(20)].map(() => {
            const randomStr = "abcdefghijklmnopqrstuvwxyz"
              .split("")
              .sort(() => 0.5 - Math.random())
              .join("");
            return randomStr.slice(0, Math.random() * 26 + 2);
          })
        ]);
      }, 3000);
    },
    option: {
      threshold: 1
    }
  });

  useEffect(() => {
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [unsubscribe]);

  return (
    <div className="App">
      <h3>Infinity scroll</h3>
      <div
        className="scroll_container"
        ref={ref}
        style={{ overflow: "scroll" }}
      >
        {products.map((el, id) => (
          <p key={id}>{el}</p>
        ))}
        {isLoading && <h5>Loading....</h5>}
      </div>
    </div>
  );
}

export default App;
