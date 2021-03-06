import Select from 'react-select'

const options = [
    { value: 'movie', label: 'Movies', image: '/movie.svg' },
    { value: 'serie', label: 'Series', image: '/monitor.svg' },
    { value: 'actor', label: 'Actors', image: '/actors.svg' }
];

const SelectInput = ({name, onChange}) => {
    return (
        <Select
            onChange={onChange}
            placeholder={"Category"}
            name={name}
            value={options.value}
            options={options}
            formatOptionLabel={option => (
                <div>
                    <img width={20} height={20} src={option.image} alt="category"/>
                    <span style={{fontSize: 'small'}} className={"text-black"}> {option.label}</span>
                </div>
            )}
        />
    )
}

export default SelectInput;
