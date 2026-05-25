import React from 'react'

const Spinner = () => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    )
}

export default Spinner
