import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProjects } from '../../redux/api/apiProjectRequest';

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {allProjects, isFeching} = useSelector((state: any) => state.project.projects)
  
  React.useEffect(() => {
    if(!allProjects.length)
      getProjects(dispatch)
  }, [])

  if(isFeching)
    return (
      <div className="d-flex justify-content-center mt-2">
          <Spinner animation='border' variant='info' />
      </div>
  )

  return (
    <Row>
      {allProjects.map((project: any) => {
        return (
          <Col xs={3} style={{marginBottom: 10}}>
            <div className="project-button" onClick={() => navigate(`/me/my-task?project=${project._id}`)}>
              <Button style={{marginRight: 10}}>
                <FontAwesomeIcon icon={faBookOpen} width={20} height={20}/>
              </Button>
              <div className='project-info'>
                <span className='project-name'>{project.Name}</span>
                <span>{project.Owner.firstName + ' ' + project.Owner.lastName}</span>
              </div>
              
            </div>
          </Col>)
      })}
    </Row>
  );
}

export default Home
