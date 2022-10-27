import { CreateProjectPageContainer, BottomContainer, SummaryContainer, TopContainer, FriendsContainer, OverflowContainer, MembersContainer,CancelButton, CreateButton, ControlContainer, MembersSearchbar } from "./style";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { TextField } from "@mui/material";
import { EmptyProject } from "../../constants/projects";
import FriendsCard from "../../components/FriendsCard/FriendsCard";
import { useEffect, useState } from "react";
import { IProjectDetails } from "../../interfaces/project";
import { postProject } from "../../api/project";
import Popup from "../../components/Popup/Popup";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";
import { IProfile } from "../../interfaces/api-response";
import { search } from "../../helpers";
import { getConnections } from "../../api/connect";

const CreateProjectPage = () => {
  const navigate = useNavigate();

  const [error, setError] = useState<string>("");
  const [projectDetail, setProjectDetails] = useState<IProjectDetails>(EmptyProject);
  const [members, setMembers] = useState<IProfile[]>([]);
  const [addedMembers, setAddedMembers] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchMember, setSearchMember] = useState<string>("");

  const createProject = async () => {
    if (projectDetail.title === "") {
      setError("Project must have a title.");
      return;
    }
    try {
      const resp = await postProject(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!, projectDetail, addedMembers);
      navigate(`/project/${resp.id}`);
    } catch (err: any) {
      console.log(err);
    }
  }

  const loadMembers = async () => {
    try {
      const resp = await getConnections(parseInt(sessionStorage.getItem(process.env.REACT_APP_PROFILE_ID!)!));
      setMembers(resp);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, [])
  
  // Add or remove member from list
  const moveMember = (profileId: number) => {
    if (!addedMembers.includes(profileId)) setAddedMembers([...addedMembers, profileId]);
    else setAddedMembers(addedMembers.filter(userId => userId !== profileId));
  }

  return(
    <>
      {isLoading 
        ? <LoadingOverlay isOpen={isLoading}/>
        : (
            <>
              <Popup
                isOpen={error !== ""}
                popupMessage={error}
                handleClose={() => setError("")}
                type="error"
              />
              <CreateProjectPageContainer>
                <Header />
                <TopContainer>
                  <h1>Create a project</h1>
                  <h2>Project name</h2>
                  <TextField
                    placeholder="Project Name"  
                    sx={{ width: '100%' }}
                    onChange={(e) => setProjectDetails({ ...projectDetail, title: e.target.value })}                
                  />
                </TopContainer>
                <BottomContainer>
                  <SummaryContainer>
                    <h2>Summary</h2>
                    <TextField
                      multiline
                      rows={14}
                      placeholder="Summary of the project"
                      sx={{ width: '95%' }} 
                      onChange={(e) => setProjectDetails({ ...projectDetail, description: e.target.value })}
                    />
                  </SummaryContainer>
                  <MembersContainer>
                    <h2>Members</h2>
                    <FriendsContainer>
                      <MembersSearchbar 
                        placeholder="Search for a member to add..."
                        onChange={(e) => setSearchMember(e.target.value)}
                      />
                      <OverflowContainer>
                        {members.length === 0 
                          ?
                            <p>Add friends</p>
                          :
                            (search(members, searchMember).map((profile: IProfile) => (
                              <div key={profile.id} onClick={() => moveMember(profile.id)}>
                                <FriendsCard
                                  key={profile.id}
                                  profileId={profile.id}
                                  name={profile.name}
                                  email={profile.email}
                                  imageURL={profile.profilePicture}
                                  functionality="moveMember"
                                  projectId={null!}
                                  alreadyAdded={addedMembers.includes(profile.id)}
                                />
                              </div>
                            )))
                        }
                      </OverflowContainer>
                    </FriendsContainer>
                  </MembersContainer>  
                </BottomContainer>
                <ControlContainer>
                  <CancelButton variant='contained' onClick={() => navigate("/dashboard", {state:{initialPageState:"projects"}})}>Cancel</CancelButton>
                  <CreateButton variant='contained' onClick={createProject}>Create</CreateButton>
                </ControlContainer>
                <Footer />
              </CreateProjectPageContainer>
            </>
          )
        }
    </>
  );
}

export default CreateProjectPage;