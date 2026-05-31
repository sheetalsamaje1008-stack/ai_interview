import React from 'react'
import { Controller } from 'react-hook-form'
import {
    Field,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {FieldValues,Control,Path} from "react-hook-form"

interface FormInputProps<T extends FieldValues> {
    control:Control<T>,
    name:Path<T>,
    label:string,
    placeholder?:string,
    type?:'text' | 'email' | 'password' | 'number'
}

const FormInput = ({ control, name, label, placeholder, type = "text" }: FormInputProps<T>) => (

    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <Field >
                <FieldLabel className="label">{label}</FieldLabel>
                <Input
                    {...field}
                   className="input"
                    placeholder={placeholder}
                    type={type}
                />
            </Field>
        )}
    />


)


export default FormInput