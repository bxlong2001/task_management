import { Alert } from 'react-bootstrap'

const AlertMessage = ({info}: any) => {
  return info && (
      <Alert variant={info.type}>{info.message}</Alert>
  )
}

export default AlertMessage