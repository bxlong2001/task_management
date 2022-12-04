import React, { useContext, useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Image {
  file: File | null,
  prev: string
}

const Info = () => {
  const inputFocus = useRef<HTMLInputElement>(null)
  const [isDisabledEditName, setDisabledEditName] = useState(true)
  const [isDisabledEditPassword, setDisabledEditPassword] = useState(true)
  const user = useSelector((state: any) => state.user.loadUser.currentUser)
  const [fullname, setFullname] = useState(user.lastName + ' ' + user.firstName)
  const [changePasswordForm, setChangePasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })

  const {oldPassword, newPassword, confirmNewPassword} = changePasswordForm

  const [img, setImg] = useState<Image>({file: null, prev: ''})

  useEffect(() => {
    if (inputFocus.current != null) 
        inputFocus.current.focus()
  }, [isDisabledEditName])

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(img.prev)
    }
  }, [img.prev])

  const handleSeclectImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target?.files)
      setImg({file: e.target.files[0], prev: URL.createObjectURL(e.target.files[0])})
  }

  const handleChangeName = (e:any) => {
    setFullname(e.target.value)
  }

  const handleChangePassword = (e:any) => {
    setChangePasswordForm({
        ...changePasswordForm,
        [e.target.name]: e.target.value
    })  
  }

  const submitChangePassword = async () => {
    // if(newPassword !== confirmNewPassword){
    //     alert('Mật khẩu không khớp')
    // }

    // try {
    //     const response = await changePassword({oldPassword, newPassword})
    //     if(!response.success) {
    //       return toast.error(response.message)
    //     }
    //     toast.success(response.message)
    //     setChangePasswordForm({oldPassword: '', newPassword: '', confirmNewPassword: ''})
    //     setDisabledEditPassword(true)
    // } catch (error) {
    //     console.log(error);
    // }
  }

  const submitUpdateFullname = async (e:any) => {

    // try {
    //   const response = await updateInfo(fullname)
    //   if(response.success){
    //     toast.success(response.message)
    //     return setDisabledEditName(true)
    //   }
    //   toast.error(response.message)
    // } catch (error) {
    //   console.log(error);
    // }
  }

  const submitUpdateImg = async (e:any) => {
    // e.preventDefault()
    // const id = toast.loading("Đang tải lên...")
    // try {
    //   const response = await updateImg(img.file, user.avt)
    //   if(response.success){
    //     URL.revokeObjectURL(img.prev)
    //     setImg({file: '', prev: ''})
    //     return toast.update(id, {render: response.message, type: 'success', isLoading: false, autoClose: 5000, theme: 'colored', pauseOnHover: false,})
    //   }
    //   return toast.update(id, {render: response.message, type: 'error', isLoading: false, autoClose: 5000, theme: 'colored', pauseOnHover: false,})
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <>
      <ToastContainer 
        
      />
      <Row>
        <Col sm={2}/>
        <Col sm={8}>
          <h1>Thông tin cá nhân</h1>
          <div className='info'>
            <div className='info-content'>
            <h2>Họ tên</h2>
              
              <input
                type='text'
                name='fullName'
                className='info-input-name'
                ref={inputFocus}
                maxLength={50}
                placeholder='Thêm tên của bạn'
                value={fullname}
                onChange={e => handleChangeName(e)}
                disabled={isDisabledEditName}
              />
              <p className='info-description'>
                Tên của bạn sẽ xuất hiện trên trang cá nhân
              </p>
            </div>
            {isDisabledEditName?
              <button className='btn-view info-btn' onClick={() => setDisabledEditName(false)}>
                Sửa
              </button>
                :
              <>
                <button className='btn-view info-btn' onClick={e => submitUpdateFullname(e)} style={{marginRight: 5}}>
                  Lưu
                </button>
                <button className='btn-view info-btn' style={{color: 'red', borderColor: 'red'}} onClick={() => {setFullname(user.fullname); setDisabledEditName(true)}}>
                  Hủy
                </button>
              </>
            }
          </div>
          <div className='info'>
              <div className='info-content'>
                <h2>Đổi mật khẩu</h2>
              {isDisabledEditPassword ?
                <input
                  type='password'
                  className='info-input-name'
                  value="mypassword"
                  onChange={handleChangePassword}
                  disabled={true}
                />
                :
                <>
                  <input
                    type='password'
                    name='oldPassword'
                    className='info-input-name'
                    placeholder='Mật khẩu cũ'
                    value={oldPassword}
                    required
                    onChange={handleChangePassword}
                  />
                  <input
                    type='password'
                    name='newPassword'
                    className='info-input-name'
                    placeholder='Mật khẩu mới'
                    value={newPassword}
                    required
                    onChange={handleChangePassword}
                  />
                  <input
                    type='password'
                    name='confirmNewPassword'
                    className='info-input-name'
                    placeholder='Xác nhận mật khẩu mới'
                    value={confirmNewPassword}
                    required
                    onChange={handleChangePassword}
                  />
                </>
              }
              </div>
              
            {isDisabledEditPassword?
              <button className='btn-view info-btn' onClick={() => setDisabledEditPassword(false)}>
                Đổi
              </button>
                :
              <>
                <button className='btn-view info-btn' onClick={() => submitChangePassword()} style={{marginRight: 5}}>
                  Lưu
                </button>
                <button className='btn-view info-btn' style={{color: 'red', borderColor: 'red'}} onClick={() => {setDisabledEditPassword(true)}}>
                  Hủy
                </button>
              </>
            }
          </div>  
          <div className='info'>
            <div className='info-content'>
              <h2>Hình đại diện</h2>
              <br/>
              <div className='info-avatar'>
                <img className='info-img' src={img.prev ? img.prev : user.avatar} alt='avatar'/>
                <div className='info-round'>
                  <input
                    type='file'
                    name='avt'
                    accept="image/png, image/jpeg, image/jpg"
                    className='info-input-avt'
                    onChange={handleSeclectImg}
                  />
                  <FontAwesomeIcon icon={faCamera}/>
                </div>
              </div>
              <p  className='info-description'>
                Nên là ảnh vuông, chấp nhận các tệp: JPG, JPEG, PNG
              </p>
            </div>
            {img.prev && <button className='btn-view info-btn' onClick={e => submitUpdateImg(e)}>
              Lưu
            </button>}
          </div>
          <div className='info'>
            <div className='info-content'>
              <h2>Email</h2>
              <input
                type='text'
                name='full_name'
                className='info-input-name'
                value={user.email}
                onChange={handleChangeName}
                disabled={true}
              />
            </div>
          </div>
           
        </Col>
        <Col sm={2}/>
      </Row>
    </>
  )
}

export default Info