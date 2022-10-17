package com.redlions.backend.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="profile")
public class Profile {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="name")
    private String name;

    @Column(unique=true, name="email")
    private String email;

    @Column(name="password")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(name="points")
    private Long points;

    @Column(name="happiness")
    private Long happiness;

    @Lob
    @Column(name="profile_picture")
    private String profilePicture;

    @Column(name="about_me")
    private String aboutMe;

    @Column(name="busyness")
    private Float busyness;

    @JsonIgnore
    @ManyToMany(mappedBy="profiles")
    private Set<Project> projects = new HashSet<>();

    @OneToMany(mappedBy="profileAuthor")
    private Set<Task> authoredTasks = new HashSet<>();

    @OneToMany(mappedBy="profileAssignee")
    private Set<Task> assignedTasks = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name="requested_connections",
        joinColumns = @JoinColumn(name="profile_id1"),
        inverseJoinColumns = @JoinColumn(name="profile_id2")
    )
    private Set<Profile> requestedTo1 = new HashSet<>();

    @ManyToMany(mappedBy="requestedTo1")
    private Set<Profile> requestedTo2 = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name="accepted_connections",
        joinColumns = @JoinColumn(name="profile_id1"),
        inverseJoinColumns = @JoinColumn(name="profile_id2")
    )
    private Set<Profile> acceptedTo1 = new HashSet<>();

    @ManyToMany(mappedBy="acceptedTo1")
    private Set<Profile> acceptedTo2 = new HashSet<>();

    
    public Profile () {

    }

    public Profile(Long id, String name, String email, String password, Long points, Long happiness, String aboutMe, String profilePicture, Float busyness) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.points = points;
        this.happiness = happiness;
        this.profilePicture = profilePicture;
        this.aboutMe = aboutMe;
        this.busyness = busyness;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getPoints() {
        return this.points;
    }

    public void setPoints(Long points) {
        this.points = points;
    }

    public Long getHappiness() {
        return this.happiness;
    }

    public void setHappiness(Long happiness) {
        this.happiness = happiness;
    }

    public String getProfilePicture() {
        return this.profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Set<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    public void addProject(Project project) {
        this.projects.add(project);
    }

    public void removeProject(Project project) {
        this.projects.remove(project);
    }


    public Set<Task> getAuthoredTasks() {
        return this.authoredTasks;
    }

    public void setAuthoredTasks(Set<Task> authoredTasks) {
        this.authoredTasks = authoredTasks;
    }

    public Set<Task> getAssignedTasks() {
        return this.assignedTasks;
    }

    public void setAssignedTasks(Set<Task> assignedTasks) {
        this.assignedTasks = assignedTasks;
    }

    public Set<Profile> getConnectedTo1() {
        return this.connectedTo1;
    }

    public void setConnectedTo1(Set<Profile> connectedTo1) {
        this.connectedTo1 = connectedTo1;
    }

    public Set<Profile> getConnectedTo2() {
        return this.connectedTo2;
    }

    public void setConnectedTo2(Set<Profile> connectedTo2) {
        this.connectedTo2 = connectedTo2;
    }


    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public Float getBusyness() {
        return busyness;
    }

    public void setBusyness(Float busyness) {
        this.busyness = busyness;
    }

    public void addRequestedConnection(Profile profile) {
        this.requestedTo1.add(profile);
    }

    public Set<Profile> getRequestedConnections() {
        return this.requestedTo1;
    }

    public void removeRequestedConnection(Profile profile) {
        this.requestedTo1.remove(profile);
    }

    public void addAcceptedConnection(Profile profile) {
        this.acceptedTo1.add(profile);
    }

    public Set<Profile> getAcceptedConnections() {
        return this.acceptedTo1;
    }

    public void removeAcceptedConnection(Profile profile) {
        this.acceptedTo1.remove(profile);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            ", points='" + getPoints() + "'" +
            ", happiness='" + getHappiness() + "'" +
            ", aboutMe='" + getAboutMe() + "'" +
            ", profilePicture='" + getProfilePicture() + "'" +
            ", busyness='" + getBusyness() + "'" +
            "}";
    }

}
