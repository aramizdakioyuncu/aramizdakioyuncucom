import 'package:get/get_rx/src/rx_types/rx_types.dart';

class Socialaccounts {
  Rxn<String>? facebook;
  Rxn<String>? github;
  Rxn<String>? instagram;
  Rxn<String>? linkedin;
  Rxn<String>? reddit;
  Rxn<String>? steam;
  Rxn<String>? twitch;
  Rxn<String>? youtube;
  Rxn<String>? discord;

  Socialaccounts({
    required this.facebook,
    required this.github,
    required this.instagram,
    required this.linkedin,
    required this.reddit,
    required this.steam,
    required this.twitch,
    required this.youtube,
    required this.discord,
  });
}
