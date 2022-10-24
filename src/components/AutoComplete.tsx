import { Checkbox, TextField } from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import { CheckIcon } from '@heroicons/react/outline';
import { Listbox } from '@headlessui/react';

export const MultipleAutoComplete = ({ data, value, setValue, classStyles }) => {
  // const fixedOptions = defaultData
  // const [value, setValue] = React.useState([])
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <Autocomplete
      className={classStyles}
        multiple
      id="tags-standard"
      disableCloseOnSelect
      options={data}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      // onChange={setValue}
      getOptionSelected={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.label}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </React.Fragment>
      )}
        // defaultValue={defaultData}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
          />
        )}
      />
  )
}
export const SingleAutoComplete = ({data, classStyles, setValue, value}) => {
  function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const [inputValue, setInputValue] = React.useState('')
  return (
    <Autocomplete
        value={value}
        onChange={(event: any, newValue: {value: any, label: any}) => {
          setValue(newValue?.value)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={data}
          getOptionLabel={(option) => option.label}
            getOptionSelected={(option, value) => option?.value === value?.value}
      renderInput={(params) => <TextField {...params} label="Students" variant="outlined" className={classStyles} />}
      
      />
  )
}