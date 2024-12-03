import 'dart:developer';

import 'package:aramizdakioyuncucom/app/data/models/ARMOYU/country.dart';
import 'package:aramizdakioyuncucom/app/data/models/ARMOYU/media.dart';
import 'package:aramizdakioyuncucom/app/data/models/ARMOYU/province.dart';
import 'package:aramizdakioyuncucom/app/data/models/game.dart';
import 'package:aramizdakioyuncucom/app/data/models/socialaccounts.dart';
import 'package:aramizdakioyuncucom/app/data/models/user.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/login&register&password/login.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:get/get.dart';

class ProfileController extends GetxController {
  final profileUsername = Get.parameters['username'];
  Rxn<User> profileInfo = Rxn<User>();

  @override
  void onInit() {
    super.onInit();

    fetchuser(profileUsername);
  }

  fetchuser(username) async {
    LookProfilewithUsernameResponse response = await ARMOYU
        .service.utilsServices
        .lookProfilewithusername(userusername: username);

    log(response.result.status.toString());

    if (!response.result.status ||
        response.result.description == "Oyuncu bilgileri yanlış!") {
      return;
    }

    log(response.response!.toJson().toString());

    List<Game> populargamelist = [];

    if (response.response!.popularGames != null) {
      for (PopularGame game in response.response!.popularGames!) {
        populargamelist.add(
          Game(
            gameID: game.gameID!,
            name: game.gameName!,
            logo: Media(
              mediaID: game.gameLogo!.mediaID,
              mediaURL: MediaURL(
                bigURL: Rx(game.gameLogo!.mediaURL.bigURL),
                normalURL: Rx(game.gameLogo!.mediaURL.normalURL),
                minURL: Rx(game.gameLogo!.mediaURL.minURL),
              ),
            ),
            gameURL: game.gameURL!,
          ),
        );
      }
    }

    profileInfo.value = User(
      displayName: Rx<String>(response.response!.displayName!),
      xp: Rx<String>(response.response!.levelXP!),
      aboutme: Rx(response.response!.detailInfo!.about!),
      registerDate: Rxn(response.response!.registeredDate),
      burc: Rx(response.response!.burc!),
      popularGames: RxList<Game>(populargamelist),
      country: response.response!.detailInfo!.country == null
          ? null
          : Rx(
              Country(
                countryID: response.response!.detailInfo!.country!.countryID,
                name: response.response!.detailInfo!.country!.name,
                countryCode: response.response!.detailInfo!.country!.code,
                phoneCode: response.response!.detailInfo!.country!.phonecode,
              ),
            ),
      province: response.response!.detailInfo!.province == null
          ? null
          : Rx(
              Province(
                provinceID: response.response!.detailInfo!.province!.provinceID,
                name: response.response!.detailInfo!.province!.name,
                plateCode: response.response!.detailInfo!.province!.platecode,
                phoneCode: response.response!.detailInfo!.province!.phonecode,
              ),
            ),
      socialaccounts: response.response!.socailAccounts == null
          ? null
          : Rxn<Socialaccounts>(
              Socialaccounts(
                facebook:
                    Rxn<String>(response.response!.socailAccounts!.facebook),
                github: Rxn<String>(response.response!.socailAccounts!.github),
                instagram:
                    Rxn<String>(response.response!.socailAccounts!.instagram),
                linkedin:
                    Rxn<String>(response.response!.socailAccounts!.linkedin),
                reddit: Rxn<String>(response.response!.socailAccounts!.reddit),
                steam: Rxn<String>(response.response!.socailAccounts!.steam),
                twitch: Rxn<String>(response.response!.socailAccounts!.twitch),
                youtube:
                    Rxn<String>(response.response!.socailAccounts!.youtube),
                discord: null,
              ),
            ),
      avatar: response.response!.avatar == null
          ? null
          : Media(
              mediaID: response.response!.avatar!.mediaID,
              mediaURL: MediaURL(
                bigURL: Rx<String>(response.response!.avatar!.mediaURL.bigURL),
                normalURL:
                    Rx<String>(response.response!.avatar!.mediaURL.normalURL),
                minURL: Rx<String>(response.response!.avatar!.mediaURL.minURL),
              ),
            ),
      banner: response.response!.banner == null
          ? null
          : Media(
              mediaID: response.response!.banner!.mediaID,
              mediaURL: MediaURL(
                bigURL: Rx<String>(response.response!.banner!.mediaURL.bigURL),
                normalURL:
                    Rx<String>(response.response!.banner!.mediaURL.normalURL),
                minURL: Rx<String>(response.response!.banner!.mediaURL.minURL),
              ),
            ),
    );

    log(profileInfo.value!.banner!.mediaURL.minURL.value);
  }
}
