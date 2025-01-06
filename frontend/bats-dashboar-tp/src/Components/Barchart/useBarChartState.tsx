import { useState } from 'react';

const userBarChartState = (headers: string[]) => {

    const [categoricalColumn, setCategoricalColumn] = useState<string>('');
    const [numericColumn, setNumericColumn] = useState<string | null>(null);
    const [additionalColumn, setAdditionalColumn] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const handleCategoricalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoricalColumn(event.target.value);
        setSelectedCategories([]); 
      };
    
    const handleNumericChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setNumericColumn(event.target.value);
      };
    
    const handleAdditionalColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setAdditionalColumn(event.target.value);
      };
    

    return {
        categoricalColumn,
        numericColumn,
        additionalColumn,
        selectedCategories,
        handleCategoricalChange,
        handleNumericChange,
        handleAdditionalColumnChange,
    };

};

export default userBarChartState;
