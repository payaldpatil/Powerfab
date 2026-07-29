package com.powerfab.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.powerfab.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User,Integer>{

    User findByUsernameAndPassword(String username,String password);

}