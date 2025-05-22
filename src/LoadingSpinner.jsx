import { BeatLoader } from 'react-spinners';

export const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <BeatLoader
                color="#001aff" 
                size={15}
                margin={3}
                aria-label="loading-spinner"
                data-testid="loader"
            />
        </div>
    );
};
