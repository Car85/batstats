import { useState } from 'react';

const useBoxPlotState = (headers: string[]) => {
  const [categoricalColumn, setCategoricalColumn] = useState<string>('');
  const [tooltipColumn, setTooltipColumn] = useState<string>('');
  const [numericColumn, setNumericColumn] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoricalChange = (value: string) => {
    setCategoricalColumn(value);
    setSelectedCategories([]);
  };

  const handleNumericChange = (value: string) => {
    setNumericColumn(value);
  };

  const handleTooltipChange = (value: string) => {
    setTooltipColumn(value);
  };

  const handleCategoryChange = (values: string[]) => {
    setSelectedCategories(values);
  };

  return {
    categoricalColumn,
    tooltipColumn,
    numericColumn,
    selectedCategories,
    handleCategoricalChange,
    handleNumericChange,
    handleTooltipChange,
    handleCategoryChange,
  };
};

export default useBoxPlotState;
