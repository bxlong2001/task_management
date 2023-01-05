import * as React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { ProjectForm } from '../../interface';
import { newProject } from '../../redux/api/apiProjectRequest';
import { getOwner } from '../../redux/api/apiUserRequest';
import { AsyncTypeahead} from 'react-bootstrap-typeahead';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
const CreateProject = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [autoFocus, setAutoFocus] = React.useState<boolean>(true)
  const [search, setSearch] = React.useState<any[]>([])
  const [collab, setCollab] = React.useState<(string | undefined)[]>([undefined])
  
  const [projectForm, setProjectForm] = React.useState<ProjectForm>({
    Name: '',
    Notes: '',
    // Status: 'todo',
    Owner: '',
    Collaborator: [],
    StartDate: new Date(),
    EndDate: new Date(),
  })
  
  const { Name, Notes, Collaborator, StartDate } = projectForm

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setProjectForm({
        ...projectForm,
        [e.target.name]: e.target.value
      })
  }

  const handleChangeSearch = async (query: string) => {
    setIsLoading(true)
    
    try {
      if(query) {
        const res = await getOwner(query)
        setSearch(res.user)
        setIsLoading(false)
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  const filterBy = () => true;

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    

    try {
      const res = await newProject(projectForm)
      if(res.success) {
        setProjectForm({
          Name: '',
          Notes: '',
          Owner: '',
          Collaborator: [],
          StartDate: new Date(),
          EndDate: new Date(),
        })
        return toast.success('Tạo mới project thành công')
      }

      return toast.error('Tạo mới project thất bại')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-container">
      <ToastContainer theme='colored' />
      <h1>Tạo Project</h1>
      <Row>
        <Col>
          <Form id='form-update' onSubmit={submitForm}>
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                <Form.Label>Tên dự án</Form.Label>
                <Form.Control
                  type='text'
                  name='Name'
                  value={Name || ''}
                  onChange={handleChange}
                  autoFocus={autoFocus}
                  required
                />
            </Form.Group>
            <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput2"
            >
                <Form.Label>Ghi chú</Form.Label>
                <Form.Control 
                  as="textarea"
                  name='Notes'
                  value={Notes || ''}
                  onChange={handleChange}
                  required
                />
            </Form.Group>
            {/* <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput3"
            >
                <Form.Label>Tình trạng</Form.Label>
                <Form.Control 
                  as='select'
                  name='Status'
                  value={Status || 'todo'}
                  onChange={handleChange}
                  required
                >
                <option value={'todo'}>Todo</option>
                <option value={'in progress'}>In progress</option>
                <option value={'done'}>Done</option>
                </Form.Control>
            </Form.Group> */}
            
            <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput4"
            >
                <Form.Label>Người tạo</Form.Label>
                <AsyncTypeahead
                  filterBy={filterBy}
                  id="async-example"
                  isLoading={isLoading}
                  labelKey={(option: any) => option.firstName + ' ' + option.lastName}
                  minLength={3}
                  onSearch={handleChangeSearch}
                  options={search}
                  placeholder="Tìm kiếm người dùng..."
                  renderMenuItemChildren={(option: any) => (
                    <div className='search-item' onClick={() => setProjectForm({...projectForm, Owner: option._id})}>
                      <img alt='' src={option.avatar}/>
                      <div className='search-info'>
                        <span className='search-name'>{option.firstName + ' ' + option.lastName}</span>
                        <span className='search-email'>{option.email}</span>
                      </div>
                    </div>
                  )}
                />
            </Form.Group>
            <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput5"
            >
                <Form.Label>Người hợp tác</Form.Label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  {collab.map((col, index) => {
                    return (
                      <AsyncTypeahead
                        key={index}
                        style={{marginRight: 10}}
                        filterBy={filterBy}
                        id="async-example"
                        isLoading={isLoading}
                        labelKey={(option: any) => option.firstName + ' ' + option.lastName}
                        minLength={3}
                        onSearch={handleChangeSearch}
                        options={search}
                        defaultInputValue={col}
                        placeholder="Tìm kiếm người dùng..."
                        renderMenuItemChildren={(option: any) => (
                        <div className='search-item' onClick={() => setProjectForm(prev => {Collaborator[index] = option._id; return {...prev}})}>
                            <img alt='' src={option.avatar}/>
                            <div className='search-info'>
                              <span className='search-name'>{option.firstName + ' ' + option.lastName}</span>
                              <span className='search-email'>{option.email}</span>
                            </div>
                          </div>
                        )}
                      />
                    )
                  })}
                  
                  <FontAwesomeIcon
                    fontSize={20}
                    icon={faPlusCircle}
                    onClick={() => setCollab(prev => [...prev, undefined])}
                  />
                </div>
            </Form.Group>
            <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput6"
            >
                <Form.Label>Ngày bắt đầu</Form.Label>
                <Form.Control 
                  type="date"
                  name='StartDate'
                  onChange={handleChange}
                  required
                />
            </Form.Group>
            <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput6"
            >
                <Form.Label>Ngày kết thúc</Form.Label>
                <Form.Control 
                  type="date"
                  name='EndDate'
                  onChange={handleChange}
                  required
                />
            </Form.Group>
            <Button type='submit'>Tạo mới</Button>
          </Form>
        </Col>

      </Row>
    </div>
  )
}

export default CreateProject