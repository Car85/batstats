import { useState } from 'react';

const useBoxPlotState = (headers: string[]) => {
  const [categoricalColumn, setCategoricalColumn] = useState<string>('');
  const [tooltipColumn, setTooltipColumn] = useState<string>('');
  const [numericColumn, setNumericColumn] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoricalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoricalColumn(event.target.value);
    setSelectedCategories([]);
};


  const handleNumericChange = (event:  React.ChangeEvent<HTMLSelectElement>) => {
    setNumericColumn((event.target.value));
  };

  const handleTooltipChange = (event:  React.ChangeEvent<HTMLSelectElement>) => {
    setTooltipColumn((event.target.value));
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedCategories(selectedValues);
};


  return {
    categoricalColumn,
    tooltipColumn,
    numericColumn,
    selectedCategories,
    setSelectedCategories,
    handleCategoricalChange,
    handleNumericChange,
    handleTooltipChange,
    handleCategoryChange,
  };
};

export default useBoxPlotState;
