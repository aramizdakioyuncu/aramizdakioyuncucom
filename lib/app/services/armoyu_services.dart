import 'package:aramizdakioyuncucom/app/constants/api_constants.dart';
import 'package:armoyu_services/armoyu_services.dart';
import 'package:armoyu_widgets/armoyuwidgets.dart';

class ARMOYU {
  static ARMOYUServices service = ARMOYUServices(
    apiKey: APIConstants.apiKEY,
    usePreviousAPI: true,
  );

  static ARMOYUWidgets widget = ARMOYUWidgets(service: service);
}
