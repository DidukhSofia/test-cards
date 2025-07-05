import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import styles from "./filter.module.scss";
import { useCards } from "../../context/CardContext";

function getHistogramBins(prices, numBins = 40) {
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const binSize = (max - min) / numBins;

  const bins = new Array(numBins).fill(0);
  for (const price of prices) {
    const index = Math.min(
      Math.floor((price - min) / binSize),
      numBins - 1
    );
    bins[index]++;
  }

  return { bins, min, max };
}

function Filter() {
  const { cards, setPriceRange } = useCards();
  const prices = cards.map((card) => Number(card.prize));
  const { bins, min, max } = getHistogramBins(prices, 50);

  const [sliderValue, setSliderValue] = useState([min, max]);
  const [inputMin, setInputMin] = useState(String(min));
  const [inputMax, setInputMax] = useState(String(max));

  useEffect(() => {
    if (cards.length) {
      const initialRange = [min, max];
      setSliderValue(initialRange);
      setPriceRange(initialRange);
      setInputMin(String(min));
      setInputMax(String(max));
    }
  }, [min, max, cards.length, setPriceRange]);

  const handleSliderChange = (_, newValue) => {
    if (!Array.isArray(newValue)) return;
    setSliderValue(newValue);
    setInputMin(String(newValue[0]));
    setInputMax(String(newValue[1]));
  };

  const handleSliderCommit = (_, newValue) => {
    if (!Array.isArray(newValue)) return;
    setPriceRange(newValue);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleInputConfirm = () => {
    const parsedMin = Number(inputMin);
    const parsedMax = Number(inputMax);

    if (isNaN(parsedMin) || isNaN(parsedMax)) return;

    let newMin = Math.max(min, Math.min(parsedMin, max));
    let newMax = Math.max(min, Math.min(parsedMax, max));
    if (newMin > newMax) newMin = newMax;

    const newRange = [newMin, newMax];
    setSliderValue(newRange);
    setPriceRange(newRange);
    setInputMin(String(newMin));
    setInputMax(String(newMax));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputConfirm();
    }
  };

  const getFilteredBins = () => {
    const binSize = (max - min) / bins.length;
    const currentMin = sliderValue[0];
    const currentMax = sliderValue[1];
    
    return bins.map((count, i) => {
      const binStart = min + i * binSize;
      const binEnd = min + (i + 1) * binSize;
      
      const isInRange = binEnd > currentMin && binStart < currentMax;
      
      return {
        count,
        isInRange,
        binStart,
        binEnd
      };
    });
  };

  const filteredBins = getFilteredBins();
  const maxBin = Math.max(...filteredBins.map(bin => bin.isInRange ? bin.count : 0));
  if (!cards.length) return <p>Завантаження фільтра...</p>;

  return (
    <div className={styles.filter}>
      <div className={styles.filter__histogram}>
        {filteredBins.map((bin, i) => (
          <div
            key={i}
            className={`${styles.filter__histogram_bar} ${bin.isInRange ? styles.barVisible : styles.barHidden}`}
            style={{
              height: bin.isInRange ? `${(bin.count / maxBin) * 100}%` : '0%',
              width: `${100 / bins.length}%`,
            }}
          ></div>
        ))}
      </div>

      <Slider
        className={styles.filter__slider}
        value={sliderValue}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderCommit}
        valueLabelDisplay="auto"
        disableSwap
        min={min}
        max={max}
      />

      <div className={styles.filter__inputs}>
        <TextField
          label="Min price"
          variant="outlined"
          value={inputMin}
          className={styles.filter__input}
          onChange={handleInputChange(setInputMin)}
          onBlur={handleInputConfirm}
          onKeyDown={handleKeyDown}
        />
        <TextField
          label="Max price"
          variant="outlined"
          value={inputMax}
          className={styles.filter__input}
          onChange={handleInputChange(setInputMax)}
          onBlur={handleInputConfirm}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default Filter;
