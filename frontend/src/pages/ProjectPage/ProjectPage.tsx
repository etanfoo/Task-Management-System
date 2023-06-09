import {
  BottomContainer,
  CancelButton,
  EmptySummary,
  FriendsContainer,
  IconContainer,
  LabelContainer,
  MembersSearchbar,
  MidContainer,
  OverflowContainer,
  PP,
  ProjectContainer,
  ProjectPageContainer,
  SummaryContainer,
  TaskControls,
  TasksContainer,
  TaskSearchbar,
  TaskSort,
  TopContainer,
  UpdateButton,
} from "./style";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProjectSidebar from "./ProjectSidebar/ProjectSidebar";
import { useParams } from "react-router-dom";
import { EmptyProjectEdit, EmptyProjectView } from "../../constants/projects";
import { useEffect, useState } from "react";
import { IProjectDetails } from "../../interfaces/project";
import { getProject, putProject } from "../../api/project";
import FriendsCard from "../../components/FriendsCard/FriendsCard";
import TaskCard from "../../components/TaskCard/TaskCard";
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import EditIcon from "../../assets/edit.png";
import DeleteIcon from "../../assets/delete.png";
import DeleteOverlay from "../../components/DeleteOverlay/DeleteOverlay";
import { IProfile, IProject, ITask } from "../../interfaces/api-response";
import { search } from "../../helpers";
import { getConnections } from "../../api/connect";
import { Palette } from "../../components/Palette";
import { getProjectTasks } from "../../api/task";
import CreateTaskModal from "../../components/CreateTaskModal/CreateTaskModal";

const ProjectPage = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] =
    useState<IProject>(EmptyProjectView);
  const [updatedProjectDetails, setUpdatedProjectDetails] =
    useState<IProjectDetails>(EmptyProjectEdit);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageState, setPageState] = useState<"edit" | "view">("view");
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [potentialMembers, setPotentialMembers] = useState<IProfile[]>([]);
  const [currentMembers, setCurrentMembers] = useState<IProfile[]>([]);
  const [addedMembers, setAddedMembers] = useState<number[]>([]);
  const [searchMember, setSearchMember] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [taskSortType, setTaskSortType] = useState<string>("ID");
  const [allTasks, setAllTasks] = useState<ITask[]>([]);
  const [shownTasks, setShownTasks] = useState<ITask[]>([]);
  const [isCreateTaskModalVisible, setIsCreateTaskModalVisible] =
    useState<boolean>(false);

  const loadProject = async () => {
    try {
      const resp = await getProject(projectId!);
      setProjectDetails(resp);
      setCurrentMembers(resp.profiles);
      const connections = await getConnections(
        parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!)
      );
      // Filters a user's connections with current members of this project
      setPotentialMembers(
        connections.filter(
          (profileA) =>
            !resp.profiles.some((profileB) => profileA.id === profileB.id)
        )
      );
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const loadTasks = async () => {
    try {
      const resp = await getProjectTasks(parseInt(projectId!));
      setAllTasks(resp);
      setShownTasks(resp);
    } catch (err: any) {
      console.log(err);
    }
  };

  const moveMember = (profileId: number) => {
    if (!addedMembers.includes(profileId))
      setAddedMembers([...addedMembers, profileId]);
    else setAddedMembers(addedMembers.filter((userId) => userId !== profileId));
  };

  const cancelEditProject = () => {
    setPageState("view");
    setUpdatedProjectDetails(EmptyProjectEdit);
  };

  const updateProject = async () => {
    // If the user presses update button but no fields were changed
    if (
      updatedProjectDetails.title === "" &&
      updatedProjectDetails.description === "" &&
      addedMembers.length === 0
    ) {
      setPageState("view");
      return;
    }

    // Check if the user provided a new input, if not use the previous input
    updatedProjectDetails.title = !!updatedProjectDetails.title
      ? updatedProjectDetails.title
      : projectDetails.title;
    updatedProjectDetails.description = !!updatedProjectDetails.description
      ? updatedProjectDetails.description
      : projectDetails.description;
    updatedProjectDetails.id = projectDetails.id;

    try {
      await putProject(
        parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!),
        updatedProjectDetails,
        addedMembers
      );
      window.location.reload();
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    let sortedTasks: any[] = shownTasks;
    if (taskSortType === "ID") {
      sortedTasks = [...shownTasks].sort((taskA, taskB) =>
        taskA.id.toString().localeCompare(taskB.id.toString())
      );
    } else if (taskSortType === "Title") {
      sortedTasks = [...shownTasks].sort((taskA, taskB) =>
        taskA.title.localeCompare(taskB.title)
      );
    } else if (taskSortType === "Status") {
      sortedTasks = [...shownTasks].sort((taskA, taskB) =>
        taskA.status.toString().localeCompare(taskB.status.toString())
      );
    } else if (taskSortType === "Deadline") {
      sortedTasks = [...shownTasks].sort((taskA, taskB) =>
        taskA.deadline.localeCompare(taskB.deadline)
      );
    }
    setShownTasks(sortedTasks);
    // eslint-disable-next-line
  }, [taskSortType]);

  useEffect(() => {
    loadProject();
    loadTasks();
    // eslint-disable-next-line
  }, [projectId]);

  useEffect(() => {
    setShownTasks(
      allTasks.filter((task) => task.title.toLowerCase().includes(searchQuery))
    );
    setTaskSortType("ID");
    // eslint-disable-next-line
  }, [searchQuery]);

  return (
    <>
      {isLoading ? (
        <LoadingOverlay isOpen={isLoading} />
      ) : (
        <>
          <DeleteOverlay
            isOpen={isDelete}
            content="project"
            contentId={projectId!}
            closeCallback={() => setIsDelete(false)}
            memberId={null}
            secondaryContentId={null}
          />
          <CreateTaskModal
            isOpen={isCreateTaskModalVisible}
            handleClose={() => {
              setIsCreateTaskModalVisible(false);
            }}
            projectId={projectId!}
          />
          <Header />
          <ProjectPageContainer>
            <ProjectSidebar
              id={projectId!}
              triggerCreateTaskModal={() => setIsCreateTaskModalVisible(true)}
            />
            <ProjectContainer>
              <TopContainer>
                {pageState === "view" ? (
                  <h1>{projectDetails.title}</h1>
                ) : (
                  <TextField
                    placeholder={projectDetails.title}
                    onChange={(e) =>
                      setUpdatedProjectDetails({
                        ...updatedProjectDetails,
                        title: e.target.value,
                      })
                    }
                  />
                )}
                <IconContainer>
                  {pageState === "view" ? (
                    <>
                      <img
                        src={EditIcon}
                        onClick={() => setPageState("edit")}
                        alt="edit icon"
                      />
                      <img
                        src={DeleteIcon}
                        onClick={() => setIsDelete(true)}
                        alt="delete icon"
                      />
                    </>
                  ) : (
                    <>
                      <CancelButton
                        variant="contained"
                        onClick={cancelEditProject}
                      >
                        Cancel
                      </CancelButton>
                      <UpdateButton variant="contained" onClick={updateProject}>
                        Update
                      </UpdateButton>
                    </>
                  )}
                </IconContainer>
              </TopContainer>
              <PP>
                <MidContainer>
                  <SummaryContainer>
                    {pageState === "view" ? (
                      <p>
                        {projectDetails.description === "" ? (
                          <EmptySummary>Add a project summary</EmptySummary>
                        ) : (
                          projectDetails.description
                        )}
                      </p>
                    ) : (
                      <TextField
                        multiline
                        rows={6}
                        placeholder={projectDetails.description}
                        onChange={(e) =>
                          setUpdatedProjectDetails({
                            ...updatedProjectDetails,
                            description: e.target.value,
                          })
                        }
                        sx={{ width: "100%" }}
                      />
                    )}
                  </SummaryContainer>
                  <BottomContainer>
                    <TaskControls>
                      <TaskSearchbar
                        label="Search for a task..."
                        onChange={(e) =>
                          setSearchQuery(e.target.value.toLocaleLowerCase())
                        }
                      />
                      <TaskSort>
                        <InputLabel>Sort by</InputLabel>
                        <Select
                          label="Your tasks"
                          value={taskSortType}
                          onChange={(e: SelectChangeEvent) =>
                            setTaskSortType(e.target.value)
                          }
                        >
                          <MenuItem value={"ID"}>ID</MenuItem>
                          <MenuItem value={"Title"}>Title</MenuItem>
                          <MenuItem value={"Deadline"}>Deadline</MenuItem>
                          <MenuItem value={"Status"}>Status</MenuItem>
                        </Select>
                      </TaskSort>
                    </TaskControls>
                    <TasksContainer>
                      <LabelContainer>
                        <p
                          style={{
                            color:
                              taskSortType === "ID" ? "black" : Palette.thGray,
                          }}
                        >
                          ID
                        </p>
                        <p
                          style={{
                            color:
                              taskSortType === "Title"
                                ? "black"
                                : Palette.thGray,
                          }}
                        >
                          Title
                        </p>
                        <p
                          style={{
                            color:
                              taskSortType === "Deadline"
                                ? "black"
                                : Palette.thGray,
                          }}
                        >
                          Deadline
                        </p>
                        <p
                          style={{
                            color:
                              taskSortType === "Status"
                                ? "black"
                                : Palette.thGray,
                          }}
                        >
                          Status
                        </p>
                      </LabelContainer>
                      <OverflowContainer>
                        {shownTasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            taskId={task.id}
                            projectId={task.project.id}
                            title={task.title}
                            deadline={task.deadline}
                            status={task.status}
                          />
                        ))}
                      </OverflowContainer>
                    </TasksContainer>
                  </BottomContainer>
                </MidContainer>
                <FriendsContainer>
                  {potentialMembers.length === 0 && pageState === "edit" ? (
                    <p>You have no friends to add...</p>
                  ) : (
                    <>
                      <MembersSearchbar
                        placeholder={
                          pageState === "view"
                            ? "Search for a member"
                            : "Search for a member to add..."
                        }
                        onChange={(e) => setSearchMember(e.target.value)}
                        sx={{ width: "91%" }}
                      />
                      <OverflowContainer>
                        {pageState === "view"
                          ? search(currentMembers, searchMember).map(
                              (profile: IProfile) => (
                                <FriendsCard
                                  key={profile.id}
                                  profileId={profile.id}
                                  name={profile.name}
                                  email={profile.email}
                                  imageURL={profile.profilePicture}
                                  functionality="profile-project"
                                  projectId={projectId!}
                                  alreadyAdded={false}
                                />
                              )
                            )
                          : search(potentialMembers, searchMember).map(
                              (profile: IProfile) => (
                                <div
                                  key={`member ${profile.id}`}
                                  onClick={() => moveMember(profile.id)}
                                >
                                  <FriendsCard
                                    key={`key ${profile.id}`}
                                    profileId={profile.id}
                                    name={profile.name}
                                    email={profile.email}
                                    imageURL={profile.profilePicture}
                                    functionality="moveMember"
                                    projectId={null!}
                                    alreadyAdded={addedMembers.includes(
                                      profile.id
                                    )}
                                  />
                                </div>
                              )
                            )}
                      </OverflowContainer>
                    </>
                  )}
                </FriendsContainer>
              </PP>
            </ProjectContainer>
            <Footer />
          </ProjectPageContainer>
        </>
      )}
    </>
  );
};

export default ProjectPage;
