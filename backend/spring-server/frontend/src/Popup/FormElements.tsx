import React, { Fragment } from 'react';
import { CloseIcon, PhotoIcon } from '../icons';

type FormProps = {
    onSubmit: (ev: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
}
export function FormField(props: FormProps) {
    const { children } = props;
    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const el = ev.target as HTMLFormElement;
        if (!el.checkValidity()) {
            //TODO: Show error
            return;
        }
        props.onSubmit(ev);
    }
    return (
        <form onSubmit={onSubmit} className='flex flex-col w-full items-center gap-y-5 py-5'>
            {children}
        </form>
    )
}

export function SubmitBtn() {
    return (
        <button
            className="py-2 mt-10 px-4 outline-sec outline outline-1 rounded-md text-sec shadow-shadowSec hover:shadow-shadowSecHover hover:bg-sec hover:text-white font-semibold transition-all"
            type="submit">Δημιουργία</button>
    )
}

type ImageFieldProps = {
    onChange: (newPath: string, file: File) => void;
    handleRemove: () => void;
    logoPath?: string;
    title?: string;
}


export function ImageFieldRef(props: ImageFieldProps) {
    const { logoPath, handleRemove, onChange } = props;
    const ref = React.useRef<HTMLInputElement>(null);

    const title = props.title ?? 'Προσθήκη Logo';
    const handleFile = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!ev.target.files) return;
        const file = ev.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (!ev.target) return;
            onChange(ev.target.result as string, file);
        }
        reader.readAsDataURL(file);
    }
    const handleClick = () => {
        if (!ref.current) return;
        ref.current.click();
    }
    return (
        <Fragment>
            <fieldset className="flex w-[60%] gap-y-2 justify-between items-center">
                <label className="text-sm font-semibold text-slate-700" htmlFor={'logo'}>{title}</label>
                <PhotoIcon onClick={handleClick} />
                <input accept={'image/png, image/jpeg, image/svg'} ref={ref} type='file' name='logo' onChange={handleFile}
                    className='file:px-2 hidden file:py-2 file:rounded-md file:text-hi file:border-slate-700 file:border-[1px] file:bg-transparent file:hover:bg-slate-700 file:hover:text-white cursor-pointer file:cursor-pointer'
                />
            </fieldset>
            {logoPath &&
                <figure className='w-[60%] relative'>
                    <img src={(!logoPath || logoPath.length == 0) ? '/paok.png' : logoPath} className='object-contain w-full h-[200px]' />
                    <div className='absolute top-2 -right-4'>
                        <CloseIcon onClick={handleRemove} />
                    </div>
                </figure>
            }
        </Fragment>
    )
}

type FieldProps = {
    label: string;
    name: string;
    value: string | number;
    type?: 'text' | 'number'
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    minLength?: number;
    placeholder?: string;
}

export function Field(props: FieldProps) {
    const { label, name, required: req, minLength: minL, placeholder, value, onChange } = props;
    const type = props.type ?? 'text';
    const minLength = type != 'number' ? minL ?? 4 : 1;
    const required = req ?? true;
    const placeholderText = placeholder ?? label;

    return (
        <fieldset className={`flex flex-col w-[60%] gap-y-0 relative wireless:w-[90%]`}>
            <label className="text-sm font-medium text-slate-700" htmlFor={name}>{label}{required ? <span className='text-slate-800'>*</span> : ''}
            </label>
            <div className='relative'>
                <input min={180} max={300} required={required} minLength={minLength}
                    className="border-b-[2px] w-full border-b-slate-400 py-2 outline-none focus:border-b-sky-700 invalid:border-b-red-500 valid:border-b-green-500" value={value} onChange={onChange}
                    placeholder={placeholderText} type={type} name={name} id={name} />
                {type == 'number' &&
                    <span className='absolute top-[7px] left-10'>cm</span>
                }
            </div>
        </fieldset>
    )
}