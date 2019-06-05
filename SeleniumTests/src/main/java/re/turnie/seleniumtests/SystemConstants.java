package re.turnie.seleniumtests;

public class SystemConstants {

    public static final String FRONTEND_URL = "";

    public static final TestBrowser BROWSER_USED_FOR_TESTS = TestBrowser.Chrome;

    public enum TestBrowser {
        Chrome("webdriver.chrome.driver", ""),
        Firefox("webdriver.gecko.driver", "");

        private String systemComponentName;
        private String driverPath;

        TestBrowser(String systemComponentName, String driverPath) {
            this.systemComponentName = systemComponentName;
            this.driverPath = driverPath;
        }

        public String getSystemComponentName() {
            return systemComponentName;
        }

        public String getDriverPath() {
            return driverPath;
        }
    }
}
