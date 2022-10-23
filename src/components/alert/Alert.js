import React, { useEffect } from 'react'
import "./Alert.css"
import { FaExclamationCircle, FaTimes } from 'react-icons/fa'

const Alert = ({alertContent,alertClass,onCloseAlert}) => {

  useEffect(()=>{
    const interval = setTimeout(()=>{
      onCloseAlert()
    },3000)

    return ()=>{
      clearTimeout(interval)
    }
  })
  return (
    <div className={`alert ${alertClass} --card  --bg-white`}>
        <span className='--flex-start --cg --align-center --pl'>
          {
            alertClass==="danger"?<span className='--py --pr '> <FaExclamationCircle size={16}/>  </span>:null
          }
            
            <p className='--fw-bold --color-danger '>{alertContent}</p>
        </span>
        <div onClick={onCloseAlert} className='--p icons --flex-center'>
            <FaTimes size={16}/>
        </div>
    </div>
  )
}

export default Alert;