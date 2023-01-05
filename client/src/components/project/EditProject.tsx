import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ProjectForm } from '../../interface';
import { editProject } from '../../redux/api/apiProjectRequest';
import { getOwner } from '../../redux/api/apiUserRequest';

const EditProject = ({project}: any) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<any[]>([])
  const [collab, setCollab] = React.useState<(string | undefined)[]>(project.Collaborator.map((coll: any) => coll._id))

  const [autoFocus, setAutoFocus] = React.useState<boolean>(true)

  const [projectForm, setProjectForm] = React.useState<ProjectForm>({
      Name: project.Name,
      Notes: project.Notes,
      // Status: project.Status,
      Owner: project.Owner.firstName + ' ' + project.Owner.lastName,
      Collaborator: collab,
      StartDate: project.StartDate,
      EndDate: project.EndDate
    })
    
const { Name, Notes, Owner, Collaborator, StartDate, EndDate } = projectForm

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
      const res = await editProject(dispatch, project._id, projectForm)
      
      if(res.success) {
        return toast.success('Thay đổi project thành công')
      }

      return toast.error('Thay đổi project thất bại')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="form-container">
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
                  defaultInputValue={Owner}
                  placeholder="Tìm kiếm người dùng..."
                  renderMenuItemChildren={(option: any) => (
                    <div className='search-item' style={{flexWrap: 'wrap'}} onClick={() => setProjectForm({...projectForm, Owner: option._id})}>
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
                  value={StartDate?.toString().split('T')[0] || ''}
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
                  value={EndDate?.toString().split('T')[0] || ''}
                  required
                />
            </Form.Group>
            <Button type='submit'>Thay đổi</Button>
          </Form>
        </Col>

      </Row>
    </div>
  )
}

export default EditProject