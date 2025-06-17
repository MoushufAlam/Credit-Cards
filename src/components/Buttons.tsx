
type Props = {
  buttonName: string
  Active: string
  setActive: (value: string) => void
}

function Buttons({
  buttonName,
  Active,
  setActive
}: Props) {

  return (
    <>
      <button className={`btn text-nowrap flex-shrink-0 border-0 ${Active == buttonName ? 'btn-danger' : 'btn-light text-secondary'}`}
        onClick={() => setActive(buttonName)}
        data-active={Active === buttonName}>
        {buttonName}
      </button>
    </>
  )
}

export default Buttons
