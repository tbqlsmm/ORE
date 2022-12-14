package io.ssafy.p.k7a504.ore.teamUser.dto;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ModifyAuthoritiesParamDto {

    @NotNull
    private Long teamUserId;

    private TeamUserRole teamUserRole;

    public static ModifyAuthoritiesParamDto createModifyAuthorityParam(ModifyAuthorityRequestDto modifyAuthorityRequestDto, TeamUserRole teamUserRole) {
        ModifyAuthoritiesParamDto modifyAuthoritiesParamDto = new ModifyAuthoritiesParamDto(modifyAuthorityRequestDto.getTeamUserId(), teamUserRole);
        return modifyAuthoritiesParamDto;
    }

}
