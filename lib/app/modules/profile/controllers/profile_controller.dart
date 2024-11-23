import 'dart:developer';

import 'package:aramizdakioyuncucom/app/data/models/ARMOYU/country.dart';
import 'package:aramizdakioyuncucom/app/data/models/ARMOYU/media.dart';
import 'package:aramizdakioyuncucom/app/data/models/ARMOYU/province.dart';
import 'package:aramizdakioyuncucom/app/data/models/game.dart';
import 'package:aramizdakioyuncucom/app/data/models/socialaccounts.dart';
import 'package:aramizdakioyuncucom/app/data/models/user.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:aramizdakioyuncucom/app/services/functions.dart';
import 'package:get/get.dart';

class ProfileController extends GetxController {
  final profileUsername = Get.parameters['username'];
  Rxn<User> profileInfo = Rxn<User>();

  @override
  void onInit() {
    super.onInit();
    Functions.cookiesetup();

    fetchuser(profileUsername);
  }

  fetchuser(username) async {
    Map<String, dynamic> response =
        await ARMOYU.service.utilsServices.lookProfilewithusername(
      username: "deneme",
      password: "deneme",
      userusername: username,
    );
    if (response['durum'] == 0) {
      return;
    }

    List<Game> populargamelist = [];
    for (var game in response['icerik']['popularGames']) {
      populargamelist.add(
        Game(
          gameID: 0,
          name: "name",
          logo: Media(
            mediaID: game['game_logo']['media_ID'],
            mediaURL: MediaURL(
              bigURL: Rx(game['game_logo']['media_bigURL']),
              normalURL: Rx(game['game_logo']['media_URL']),
              minURL: Rx(game['game_logo']['media_minURL']),
            ),
          ),
          gameURL: game['game_URL'],
        ),
      );
    }

    profileInfo.value = User(
      displayName: Rx<String>(response['icerik']['displayName']),
      xp: Rx<String>(response['icerik']['levelXP']),
      aboutme: Rx(response['icerik']['detailInfo']['about']),
      registerDate: Rxn(response['icerik']['registeredDateV2']),
      burc: Rx(response['icerik']['burc']),
      popularGames: RxList<Game>(populargamelist),
      country: response['icerik']['detailInfo']['country'] == null
          ? null
          : Rx(
              Country(
                countryID: response['icerik']['detailInfo']['country']
                    ['country_ID'],
                name: response['icerik']['detailInfo']['country']
                    ['country_name'],
                countryCode: response['icerik']['detailInfo']['country']
                    ['country_code'],
                phoneCode: response['icerik']['detailInfo']['country']
                    ['country_phoneCode'],
              ),
            ),
      province: response['icerik']['detailInfo']['province'] == null
          ? null
          : Rx(
              Province(
                provinceID: response['icerik']['detailInfo']['province']
                    ['province_ID'],
                name: response['icerik']['detailInfo']['province']
                    ['province_name'],
                plateCode: response['icerik']['detailInfo']['province']
                    ['province_plateCode'],
                phoneCode: response['icerik']['detailInfo']['province']
                    ['province_phoneCode'],
              ),
            ),
      socialaccounts: Rxn<Socialaccounts>(
        Socialaccounts(
          facebook:
              Rxn<String>(response['icerik']['socailAccounts']['facebook']),
          github: Rxn<String>(response['icerik']['socailAccounts']['github']),
          instagram:
              Rxn<String>(response['icerik']['socailAccounts']['instagram']),
          linkedin:
              Rxn<String>(response['icerik']['socailAccounts']['linkedin']),
          reddit: Rxn<String>(response['icerik']['socailAccounts']['reddit']),
          steam: Rxn<String>(response['icerik']['socailAccounts']['steam']),
          twitch: Rxn<String>(response['icerik']['socailAccounts']['twitch']),
          youtube: Rxn<String>(response['icerik']['socailAccounts']['youtube']),
          discord: null,
        ),
      ),
      avatar: Media(
        mediaID: response['icerik']['avatar']['media_ID'],
        mediaURL: MediaURL(
          bigURL: Rx<String>(response['icerik']['avatar']['media_bigURL']),
          normalURL: Rx<String>(response['icerik']['avatar']['media_URL']),
          minURL: Rx<String>(response['icerik']['avatar']['media_minURL']),
        ),
      ),
      banner: Media(
        mediaID: response['icerik']['banner']['media_ID'],
        mediaURL: MediaURL(
          bigURL: Rx<String>(response['icerik']['banner']['media_bigURL']),
          normalURL: Rx<String>(response['icerik']['banner']['media_URL']),
          minURL: Rx<String>(response['icerik']['banner']['media_minURL']),
        ),
      ),
    );

    log(profileInfo.value!.banner!.mediaURL.minURL.value);
  }
}
