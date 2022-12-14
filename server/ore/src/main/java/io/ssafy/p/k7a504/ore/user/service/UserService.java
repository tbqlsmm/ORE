package io.ssafy.p.k7a504.ore.user.service;

import io.ssafy.p.k7a504.ore.jwt.TokenDto;
import io.ssafy.p.k7a504.ore.user.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface UserService {
    long validateDomainUser();
    void sendCertificationEmail(String email);
    boolean verifyEmail(UserEmailVerificationRequestDto emailVerificationRequestDto);
    String signUp(UserSignUpRequestDto userSignUpRequestDto);
    TokenDto signIn(UserSignInRequestDto userSignInRequestDto);
    TokenDto reissue(TokenRequestDto tokenRequestDto);
    boolean logout();
    void findUserPassword(UserInfoRequestDto userInfoRequestDto);
    int addUserList(MultipartFile file);
    Slice<UserSearchResponseDto> searchUserByName(String keyword, Pageable pageable);
    Slice<UserSearchResponseDto> searchUserByNickname(String keyword, Pageable pageable);
    Slice<UserSearchResponseDto> searchAllUser(Pageable pageable);
    Slice<UserSearchResponseDto> searchUserNotInTeam(Long teamId, Pageable pageable);
    Slice<UserSearchResponseDto> searchUserByNameNotInTeam(Long teamId, String name, Pageable pageable);
    Slice<UserSearchResponseDto> searchUserByNicknameNotInTeam(Long teamId, String nickname, Pageable pageable);
    UserInfoResponseDto findUserInfo();
    Long modifyUserInfo(MultipartFile profileImage, UserModifyReqeustDto profileInfo);
    Long modifyUserPassword(UserPasswordRequestDto userPasswordRequestDto);
    Long leaveServer();
    int removeUser(List<Long> userIds);
    int modifyUserAuthority(List<UserAuthModifyRequestDto> requestDtos);
}
