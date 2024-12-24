import 'dart:developer';
import 'package:aramizdakioyuncucom/app/data/models/ARMOYU/media.dart';
import 'package:aramizdakioyuncucom/app/data/models/user.dart';
import 'package:aramizdakioyuncucom/app/services/armoyu_services.dart';
import 'package:armoyu_services/core/models/ARMOYU/API/utils/player_pop_list.dart';
import 'package:armoyu_services/core/models/ARMOYU/_response/response.dart';
import 'package:get/get.dart';
import 'package:webview_flutter_platform_interface/webview_flutter_platform_interface.dart';

class SocialController extends GetxController {
  final PlatformWebViewController controller = PlatformWebViewController(
    const PlatformWebViewControllerCreationParams(),
  )..loadRequest(
      LoadRequestParams(
        uri: Uri.parse(
            'https://discord.com/widget?id=269811924399685634&theme=dark'),
      ),
    );

  Rxn<List<User>> popList = Rxn<List<User>>(null);
  Rxn<List<User>> xpList = Rxn<List<User>>(null);

  var poplistcount = 1.obs;
  var xplistcount = 1.obs;

  var poplistProccess = false.obs;
  var xplistProccess = false.obs;

  var xppopselected = true.obs;

  @override
  void onInit() {
    super.onInit();

    fetchpopList();
    fetchxpList();
  }

  Future<void> fetchpopList() async {
    if (poplistProccess.value) {
      return;
    }

    poplistProccess.value = true;

    PlayerPopResponse response = await ARMOYU.service.utilsServices
        .getplayerpop(page: poplistcount.value);

    if (!response.result.status) {
      poplistProccess.value = false;

      return;
    }

    popList.value ??= [];
    for (APIPlayerPop element in response.response!) {
      log("pop ->${element.oyuncuAdSoyad} ${element.oyuncuSeviyeXP}");
      popList.value!.add(
        User(
          displayName: Rx(element.oyuncuAdSoyad),
          xp: Rx(element.oyuncuPop.toString()),
          userName: Rx(element.oyuncuKullaniciAdi),
          avatar: Media(
            mediaID: element.oyuncuID,
            mediaURL: MediaURL(
              bigURL: Rx(element.oyuncuAvatar),
              normalURL: Rx(element.oyuncuAvatar),
              minURL: Rx(element.oyuncuAvatar),
            ),
          ),
        ),
      );
    }

    popList.refresh();

    poplistcount.value++;
    poplistProccess.value = false;
  }

  Future<void> fetchxpList() async {
    if (xplistProccess.value) {
      return;
    }

    xplistProccess.value = true;

    PlayerPopResponse response =
        await ARMOYU.service.utilsServices.getplayerxp(page: xplistcount.value);

    if (!response.result.status) {
      xplistProccess.value = false;
      return;
    }

    xpList.value ??= [];
    for (APIPlayerPop element in response.response!) {
      log("xp ->${element.oyuncuAdSoyad} ${element.oyuncuSeviyeXP}");

      xpList.value!.add(
        User(
          displayName: Rx(element.oyuncuAdSoyad),
          xp: Rx(element.oyuncuSeviyeSezonlukXP),
          userName: Rx(element.oyuncuKullaniciAdi),
          avatar: Media(
            mediaID: element.oyuncuID,
            mediaURL: MediaURL(
              bigURL: Rx(element.oyuncuAvatar),
              normalURL: Rx(element.oyuncuAvatar),
              minURL: Rx(element.oyuncuAvatar),
            ),
          ),
        ),
      );
    }

    xpList.refresh();
    xplistcount.value++;
    xplistProccess.value = false;
  }
}
