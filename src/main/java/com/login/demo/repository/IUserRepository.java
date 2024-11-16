package com.login.demo.repository;


import com.login.demo.models.UserSec;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<UserSec, Long> {

  //  Optional<UserSec> findByEmail(String email);
    Optional<UserSec> findUserEntityByUsername(String username);

}
