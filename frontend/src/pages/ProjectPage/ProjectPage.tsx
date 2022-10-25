import { BottomContainer, CancelButton, EmptySummary, FriendsContainer, IconContainer, LabelContainer, MembersSearchbar, MidContainer, OverflowContainer, ProjectContainer, ProjectPageContainer, SummaryContainer, TaskControls, TasksContainer, TaskSearchbar, TaskSort, TopContainer, UpdateButton } from "./style";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProjectSidebar from "../../components/ProjectSidebar/ProjectSidebar";
import { useParams } from "react-router-dom";
import { EmptyProject } from "../../constants/projects";
import { useEffect, useState } from "react";
import { IProjectDetails } from "../../interfaces/project";
import { getProject, putProject } from "../../api/project";
import FriendsCard from "../../components/FriendsCard/FriendsCard";
import { MockTasks } from "../../constants/tasks";
import TaskCard from "../../components/TaskCard/TaskCard";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import EditIcon from "../../assets/edit.png";
import DeleteIcon from "../../assets/delete.png";
import DeleteOverlay from "../../components/DeleteOverlay/DeleteOverlay";
// import { getProfile, getProfiles } from "../../api/profile";
import { IProfile } from "../../interfaces/api-response";
import { search } from "../../helpers";

const ProjectPage = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState<IProjectDetails>(EmptyProject);
  const [updatedProjectDetails, setUpdatedProjectDetails] = useState<IProjectDetails>(EmptyProject);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageState, setPageState] = useState<'edit' | 'view'>('view');
  const [isDelete, setIsDelete] = useState<boolean>(false); 
  const [members, setMembers] = useState<IProfile[]>([]);
  const [addedMembers, setAddedMembers] = useState<number[]>([]);
  const [searchMember, setSearchMember] = useState<string>("");
  
  const loadProject = async () => {
    try {
      const resp = await getProject(projectId!);
      setProjectDetails(resp);
      setMembers(resp.profiles);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProject();
    // eslint-disable-next-line
  }, [projectId])

  const cancelEditProject = () => {
    setPageState('view');
    setUpdatedProjectDetails(EmptyProject);
  };

  const updateProject = async () => {
    if (updatedProjectDetails.title === "" && updatedProjectDetails.description === "") {
      setPageState('view');
      return;
    }

    try {
      updatedProjectDetails.title = (!!updatedProjectDetails.title ? updatedProjectDetails.title : projectDetails.title);
      updatedProjectDetails.description = (!!updatedProjectDetails.description ? updatedProjectDetails.description : projectDetails.description);
      updatedProjectDetails.id = projectDetails.id;
      await putProject(
        parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!),
        updatedProjectDetails,
        addedMembers
      );
      window.location.reload();
    } catch (err: any) {
      console.log(err);
    }
  }

  return(
    <>
      {isLoading 
        ? <LoadingOverlay isOpen={isLoading}/>
        : (
          <>
            <DeleteOverlay isOpen={isDelete} content="project" contentId={projectId!} closeCallback={() => setIsDelete(false)} />
            <Header />
            <ProjectPageContainer>
              <ProjectSidebar id={projectId!} />
              <ProjectContainer>
                <TopContainer>
                  {pageState === 'view'
                    ? (
                      <h1>{projectDetails.title}</h1>
                    ) : (
                        <TextField
                          placeholder={projectDetails.title}
                          onChange={(e) => setUpdatedProjectDetails({ ...updatedProjectDetails, title: e.target.value })}
                        />
                      )
                    }
                  <IconContainer>
                    {pageState === 'view'
                      ? (
                        <>
                          <img src={EditIcon} onClick={() => setPageState('edit')} alt='edit icon' />
                          <img src={DeleteIcon} onClick={() => setIsDelete(true)} alt='edit icon' />
                        </>
                      ) : (
                        <>
                          <CancelButton variant='contained' onClick={cancelEditProject}>Cancel</CancelButton>
                          <UpdateButton variant='contained' onClick={updateProject}>Update</UpdateButton>
                        </>
                      )
                    }
                  </IconContainer>
                </TopContainer>
                <MidContainer>
                  <SummaryContainer>
                    {pageState === 'view'
                      ? (
                        <p> 
                          {projectDetails.description === "" 
                            ? <EmptySummary>Add a project summary</EmptySummary>
                            : projectDetails.description
                          }
                        </p>
                      ) : (
                        <TextField
                          multiline
                          rows={6}
                          placeholder={projectDetails.description}
                          onChange={(e) => setUpdatedProjectDetails({...updatedProjectDetails, description: e.target.value })}
                          sx={{ width: "100%" }}
                        />
                      )
                    }
                  </SummaryContainer>
                  <FriendsContainer>
                    <MembersSearchbar 
                      placeholder="Search for a member to add..."
                      onChange={(e) => setSearchMember(e.target.value)}
                      sx={{ width: "88%" }}
                    />
                    <OverflowContainer>
                      {/* Change to if empty */}
                      {search(members, searchMember).map((profile: IProfile) => (
                        <FriendsCard
                          key={profile.id}
                          profileId={profile.id}
                          name={profile.name}
                          email={profile.email}
                          imageURL={profile.profilePicture}
                          functionality="profile"
                        />
                      ))}
                    </OverflowContainer>
                  </FriendsContainer>
                </MidContainer>
                <BottomContainer>
                  <TaskControls>
                    <TaskSearchbar placeholder="Search for a task..."/>
                    <TaskSort>
                      <InputLabel>Sort by</InputLabel>
                      <Select
                        defaultValue="Sort by"
                        // value={age}
                        label="Your tasks"
                        // onChange={handleChange}
                      >
                        <MenuItem value="Sort by">Sort by</MenuItem>
                        <MenuItem value="Your projects">Your projects</MenuItem>
                      </Select>
                    </TaskSort>
                  </TaskControls>
                  <TasksContainer>
                    <LabelContainer>
                      <p>ID</p>
                      <p>Title</p>
                      <p>Deadline</p>
                      <p>Status</p>
                    </LabelContainer>
                    <OverflowContainer>
                      {/* todo: replace with real data returned from api */}
                      {MockTasks.map((task) => (
                        <TaskCard
                          key={task.taskId}
                          taskId={task.taskId}
                          title={task.title}
                          deadline={task.deadline}
                          status={task.status}
                        />
                      ))}
                    </OverflowContainer>
                  </TasksContainer>         
                </BottomContainer>
              </ProjectContainer>
            </ProjectPageContainer>
            <Footer />
          </>
        )
      }
    </>
  );
}

export default ProjectPage;