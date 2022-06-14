import Select from 'react-select'

const options = [
    { value: 'movies', label: 'Movies', image: '/movie.svg' },
    { value: 'series', label: 'Series', image: '/monitor.svg' },
    { value: 'actors', label: 'Actors', image: '/actors.svg' }
];

const SelectInput = ({name}) => (
    <Select
        placeholder={"Category"}
        name={name}
        value={options.value}
        options={options}
        formatOptionLabel={option => (
            <div>
                <img width={20} height={20} src={option.image} alt="category-image" />
                <span style={{ fontSize: 'small' }} className={"text-black"}> {option.label}</span>
            </div>
        )}
    />
)

export default SelectInput;
