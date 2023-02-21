import {ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes, memo} from 'react'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

export const SuperRadio: FC<SuperRadioPropsType> = memo((
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
   

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const mappedOptions: any[] = options ? options.map((o, i) => (
        <label key={name + '-' + i} >
            <input
                type={'radio'}
                name={name}
                checked={o === value}
                value={o}
                onChange={onChangeCallback}
                {...restProps}
            />
            <span >{o}</span>
        </label>
    )) : []

    return (
        <div >
            {mappedOptions}
        </div>
    )
})
