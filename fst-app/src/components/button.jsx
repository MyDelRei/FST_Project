import React from 'react';

const Button = ({
                    text,
                    type = "button", // Default type is "button" if not passed
                    width = '415px',
                    height = '60px',
                    bgColor = '#1C1C26',
                    textColor = 'white',
                    borderColor = 'transparent', // Default to no border color
                    hoverBgColor = '#333', // Customizable hover background
                    onClick, // onClick handler passed as prop
                }) => {
    return (
        <button
            type={type}
            className="rounded-[20px] border transition-all shadow-sm text-center font-['Cabin'] text-base text-[24px] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            style={{
                width: width,
                height: height,
                backgroundColor: bgColor,
                color: textColor,
                borderColor: borderColor,
            }}
            onClick={onClick} // Attach the onClick handler
            // Adding hover effect with inline styles
            onMouseEnter={(e) => e.target.style.backgroundColor = hoverBgColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = bgColor}
        >
            {text}
        </button>
    );
};

export default Button;
