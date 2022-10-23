import React from 'react'
import "./Confirm.css"

const Confirm = ({modalMsg,modalTitle,modalActionText,modalAction,onCloseModal}) => {
  return (
    <div className='confirm'>
      <div className='confirm-modal'>
        <header className='header'>
          <span>{modalTitle}</span>
          <button onClick={onCloseModal}> &times;</button>
        </header>
        <main className='main'>
          <p>{modalMsg}</p>
        </main>
        <footer className='footer'>
          <div className='buttons'>
            <button onClick={modalAction} className='ok-btn'>{modalActionText}</button>
            <button onClick={onCloseModal} className='cancel-btn'>Cancel</button>
          </div>
        </footer>

      </div>
    </div>
  )
}

export default Confirm