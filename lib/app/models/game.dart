import 'package:armoyu_widgets/data/models/ARMOYU/media.dart';

class Game {
  final int gameID;
  final String name;
  final Media logo;
  final String gameURL;

  Game({
    required this.gameID,
    required this.name,
    required this.logo,
    required this.gameURL,
  });
}
