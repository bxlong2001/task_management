import * as React from 'react';
import { BadgeProps, Button, Descriptions, Empty } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../../redux/api/apiProjectRequest';
import { Spinner } from 'react-bootstrap';
import dateFormat from "dateformat"

const MyTasks = () => {
  const dispatch = useDispatch()
  const {allProjects, isFeching} = useSelector((state: any) => state.project.projects)
  const search = useLocation().search
  const projectId = new URLSearchParams(search).get('project')
  const [projectCurrent, setProjectCurrent] = React.useState<any>()

  React.useEffect(() => {
    if(allProjects.length) {
      setProjectCurrent(allProjects.filter((project: any) => project._id === projectId)[0])
    }else {
      getProjects(dispatch)
    }
  }, [allProjects])

  console.log(projectCurrent);
  
  

  const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
      case 8:
      case 9:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  };

  const onSelect = (value: Dayjs) => {
    console.log('Selected Date', value);
    
  }

  const onPanelChange = (value: Dayjs) => {
    console.log('Panel change: ', value);
    
  }
  
  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    console.log(num);
    
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    console.log("listData", listData);
    
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  if(isFeching || !allProjects.length)
    return (
      <div className="d-flex justify-content-center mt-2">
          <Spinner animation='border' variant='info' />
      </div>
  )

  return (
    projectCurrent && <>
      <Descriptions title="Project Info">
        <Descriptions.Item label="Name">{projectCurrent.Name}</Descriptions.Item>
        <Descriptions.Item label="Status" span={2}>
          {(projectCurrent.Status === 'todo') && <Badge status="success" text={projectCurrent.Status} />}
          {(projectCurrent.Status === 'progress') && <Badge status="processing" text={projectCurrent.Status} />}
          {(projectCurrent.Status === 'done') && <Badge status="warning" text={projectCurrent.Status} />}
        </Descriptions.Item>
        <Descriptions.Item label="Owner">{projectCurrent.Owner.email}</Descriptions.Item>
        <Descriptions.Item label="Collaborator" span={2}>{projectCurrent.Collaborator.map((collab:any) => collab.email + ', ')}</Descriptions.Item>
        <Descriptions.Item label="Start Date">{dateFormat(projectCurrent.StartDate, "dddd, mmmm dS, yyyy")}</Descriptions.Item>
        <Descriptions.Item label="End Date"span={2}>{dateFormat(projectCurrent.EndDate, "dddd, mmmm dS, yyyy")}</Descriptions.Item>
        {/* <Descriptions.Item label="Address" span={3}>
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item> */}
        <Descriptions.Item label="Note">{projectCurrent.Notes}</Descriptions.Item>
      </Descriptions>
      
      {!projectCurrent.TaskList.length ? 
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={
          <span>
            No task
          </span>
        }
      >
        <Button type="primary">Create Task Now</Button>
      </Empty>:
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onPanelChange={onPanelChange}
        onSelect={onSelect}
      />}
    </>
  )
}

export default MyTasks
