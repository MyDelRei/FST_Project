import React from 'react'

const InputField = ({placeholder, type, value, onChange,width='415px',height='60px',disabled}) => {
    return (
        <div class="w-full max-w-sm min-w-[200px]">
        <input type={type} disabled={disabled} value={value} onChange={onChange} class="font-['Cabin'] bg-transparent placeholder:text-slate-400 text-slate-700 text-[20px] border border-slate-200 rounded-[20px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={placeholder}
            style={{
                width: width,
                height: height,
            }}/>
        </div>

    )
};
export default InputField
