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
import javax.persistence.ManyToMany;
import javax.persistence.Table;

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
    private String password;

    @Column(name="points")
    private Long points;

    @Column(name="happiness")
    private Long happiness;

    @Column(name="profile_picture")
    private byte[] profilePicture;

    @Column(name="about_me")
    private String aboutMe;

    @Column(name="busyness")
    private Float busyness;


    @ManyToMany
    @JoinTable(
        name="manage",
        joinColumns = @JoinColumn(name="profile_id"),
        inverseJoinColumns = @JoinColumn(name="project_id")

    )
    private Set<Project> projects = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name="profile_task",
        joinColumns = @JoinColumn(name="profile_id"),
        inverseJoinColumns = @JoinColumn(name="task_id")

    )
    private Set<Task> tasks = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name="connected_to",
        joinColumns = @JoinColumn(name="profile_id1"),
        inverseJoinColumns = @JoinColumn(name="profile_id2")
    )
    private Set<Profile> connectedTo1 = new HashSet<>();

    @ManyToMany(mappedBy="connectedTo1")
    private Set<Profile> connectedTo2 = new HashSet<>();

    public Profile () {

    }

    public Profile(Long id, String name, String email, String password, Long points, Long happiness, String aboutMe, byte[] profilePicture, Float busyness) {
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

    public byte[] getProfilePicture() {
        return this.profilePicture;
    }

    public void setProfilePicture(byte[] profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Set<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }

    public Set<Task> getTasks() {
        return this.tasks;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
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
