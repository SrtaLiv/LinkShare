package com.login.demo.service;

import com.login.demo.dto.LinkDTO;
import com.login.demo.models.Image;
import com.login.demo.models.UserSec;
import com.login.demo.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@Service
public class UserSecService implements IUserSecService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IImageService iImageService;

    @Override
    public List<UserSec> findAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<UserSec> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public UserSec save(UserSec userSec) {
        return userRepository.save(userSec);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public void update(UserSec userSec) {
        save(userSec);
    }

    @Override
    public String encriptPassword(String password) {
        return new BCryptPasswordEncoder().encode(password);
    }

    public Optional<UserSec> findByEmail(String username) {
        return userRepository.findByEmail(username);
    }

    public void enableUser(String username) {
        UserSec user = userRepository.findUserEntityByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        user.setEnabled(true);
        userRepository.save(user);
    }


    @Override
    public UserSec updateUserImage(UserSec user, MultipartFile file) throws IOException {
        if (user.getImage() != null){
            iImageService.deleteImagen(user.getImage());
        }
        Image newImg = iImageService.uploadImagen(file);
        user.setImage(newImg);
        return userRepository.save(user);
    }

}
