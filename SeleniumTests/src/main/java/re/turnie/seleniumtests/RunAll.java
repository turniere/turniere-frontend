package re.turnie.seleniumtests;

import cucumber.junit.Cucumber;
import org.junit.runner.RunWith;

@RunWith(Cucumber.class)
@Cucumber.Options(format = {"pretty", "html:target/cucumber"},
    features = {"./"})
public class RunAll {
}
