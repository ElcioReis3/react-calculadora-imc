import { useState } from "react";
import styles from "./App.module.css";
import poweredImage from "./assets/powered.png";
import leftArrowImage from "./assets/leftarrow.png";
import { levels, calculateImc, Level } from "./helpers/imc";
import { GridItem } from "./components/GridItem";

function App() {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toshow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Digite todos os campos");
    }
  };
  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  };
  return (
    <>
      <div className={styles.main}>
        <header>
          <div className={styles.headerContainer}>
            <img src={poweredImage} alt="" width={170} />
          </div>
        </header>
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1>Calcule o seu IMC.</h1>
            <p>
              É uma ferramenta utilizada para estimar a quantidade de gordura
              corporal e identificar a obesidade e os riscos à saúde associados.
            </p>

            <input
              type="number"
              value={heightField > 0 ? heightField : ""}
              onChange={(e) => setHeightField(parseFloat(e.target.value))}
              placeholder="Digite a sua altura. Ex: 1.5 (em metros)"
              disabled={toshow ? true : false}
            />
            <input
              type="number"
              value={weightField > 0 ? weightField : ""}
              onChange={(e) => setWeightField(parseFloat(e.target.value))}
              placeholder="Digite a seu peso. Ex: 75.5 (em kg)"
              disabled={toshow ? true : false}
            />
            <button
              onClick={handleCalculateButton}
              disabled={toshow ? true : false}
            >
              Calcular
            </button>
          </div>
          <div className={styles.rightSide}>
            {!toshow && (
              <div className={styles.grid}>
                {levels.map((item, key) => (
                  <GridItem key={key} item={item} />
                ))}
              </div>
            )}
            {toshow && (
              <div className={styles.rightBig}>
                <div className={styles.rightArrow} onClick={handleBackButton}>
                  <img src={leftArrowImage} width={25} />
                </div>
                <GridItem item={toshow} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
