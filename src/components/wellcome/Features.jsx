const Features = ({ commonStyles }) => {
  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
      <div className={`rounded-tl-2xl ${commonStyles}`}>
        Reliability
      </div>
      <div className={commonStyles}>
        Security
      </div>
      <div className={`rounded-tr-2xl ${commonStyles}`}>
        Ethereum
      </div>
      <div className={`rounded-bl-2xl ${commonStyles}`}>
        Web 3.0
      </div>
      <div className={commonStyles}>
        Low Fees
      </div>
      <div className={`rounded-br-2xl ${commonStyles}`}>
        Blockchain
      </div>
    </div>
  )
}

export default Features;
