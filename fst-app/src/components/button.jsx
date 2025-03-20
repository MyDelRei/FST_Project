import React from 'react'

const Button = ({text , type ,width='415px',height='60px',bgColor = '#1C1C26' ,textColor="white"}) => {
    return (
        <button
            className="rounded-[20px] ] border border-transparent text-center font-['Cabin'] text-base text-[24px]  transition-all shadow-sm hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type={type} style={{
                width: width,
                height: height,
                backgroundColor: bgColor,
                color:textColor,

        }}
        >
            {text}
        </button>
    )
}
export default Button
